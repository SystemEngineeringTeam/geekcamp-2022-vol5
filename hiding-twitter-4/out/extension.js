"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
const vscode = require("vscode");
const axios_1 = require("axios");
//実際にApiを叩く部分
//async:非同期通信で別の場所で作業して結果だけメインに送る
//Promise型:非同期処理が完了した時結果を返したり、エラーを送る
async function getPass() {
    try {
        //ここで、Apiを叩いて、パースもしてくれている
        const { data, status } = await axios_1.default.get(
        //本番はこのURLも変える
        'http://setwitter.harutiro.net:5001/get', {
            //受け取るデータの情報
            headers: {
                Accept: 'application/json',
            },
        });
        //パースしたデータを逆にJsonに戻している
        //JSON.stringify()は、JavaScriptオブジェクトを取得し、JSON 文字列に変換します
        //1つ目は出力したいデータで、2つ目は文字列または数値を、返された文字列のスペース（インデント）として使用します
        console.log("fuck you!");
        console.log(JSON.stringify(data, null, 4));
        //パースしたデータをコンソールに流す
        console.log("fuck you!");
        console.log(data.data);
        //APiを取得した時の状態を表示してくれている
        //成功したら200を返してくれる。
        //ページがなかったときは404とか
        //通信プロトコル
        console.log('response status is: ', status);
        //JSONに受け取ったデータを書き出す
        //JSON.stringify()は、JavaScriptオブジェクトを取得し、JSON 文字列に変換します
        //1つ目は出力したいデータで、2つ目は文字列または数値を、返された文字列のスペース（インデント）として使用します
        return JSON.stringify(data, null, 4);
        //エラーが起きた時の処理
    }
    catch (error) {
        console.log('error');
        return 'error';
    }
}
//実際にApiを叩く部分
//async:非同期通信で別の場所で作業して結果だけメインに送る
//Promise型:非同期処理が完了した時結果を返したり、エラーを送る
async function getToken() {
    try {
        //ここで、Apiを叩いて、パースもしてくれている
        const { data, status } = await axios_1.default.get(
        //本番はこのURLも変える
        'http://setwitter.harutiro.net:5001/twitter/request_token', {
            //受け取るデータの情報
            headers: {
                Accept: 'application/json',
            },
        });
        //APiを取得した時の状態を表示してくれている
        //成功したら200を返してくれる。
        //ページがなかったときは404とか
        //通信プロトコル
        console.log('response status is: ', status);
        //JSONに受け取ったデータを書き出す
        //JSON.stringify()は、JavaScriptオブジェクトを取得し、JSON 文字列に変換します
        //1つ目は出力したいデータで、2つ目は文字列または数値を、返された文字列のスペース（インデント）として使用します
        return data.url;
        //エラーが起きた時の処理
    }
    catch (error) {
        console.log('error');
        return 'error';
    }
}
function activate(context) {
    //Vscodeの下に表示されているステータスバーに新たな要素を表示してくれる
    const myStatusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 10000);
    const isDevelopment = vscode.env.sessionId === 'someValue.sessionId';
    //ここでアイコンの指定をしている
    const icon = isDevelopment ? '$(debug)' : '$(icon-fire)';
    const name = vscode.workspace.name;
    //何かしらのファイルが開かれているときじゃないと、表示されないようにいする
    if (name) {
        //ここでステータスバーの文字列を指定している
        myStatusBarItem.text = `${icon} Twitter`;
        myStatusBarItem.show();
    }
    //ボタンを押された時にどんなコマンんどを実行するか記載する
    const myCommandId = 'hiding-twitter-4.helloOriginal';
    myStatusBarItem.command = myCommandId;
    //マウスをかざした時のヒントを表示する
    myStatusBarItem.tooltip = `status bar item tooltip`;
    context.subscriptions.push(myStatusBarItem);
    console.log('Congratulations, your extension "hiding-twitter-4" is now active!');
    let disposable = vscode.commands.registerCommand('hiding-twitter-4.helloWorld', () => {
        //ここは、1秒に一回時間取得を読んでくれる部分
        //本番では、2分に一回盛り上がり度を取得するコードに変更する
        //２分に一回APIを呼び出すように変更
        var item = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 10);
        let printDate = function () {
            var date = new Date();
            item.text = date.getHours().toString() + ":" + date.getMinutes().toString() + ":" + date.getSeconds().toString();
            item.show();
        };
        //ここで間隔を指定している
        setInterval(printDate, 120000);
        vscode.window.showInformationMessage('Hello World from hiding-twitter-4!');
    });
    context.subscriptions.push(disposable);
    //
    let getJson = vscode.commands.registerCommand('hiding-twitter-4.getJson', () => {
        //上のメラメラアイコンを押した時にJSonを取得するコード
        const geturl = getToken();
        geturl.then(url => {
            vscode.env.openExternal(vscode.Uri.parse(url));
        }, (error) => {
            console.log(error);
        });
        vscode.window.showInformationMessage('Jsonを取得するよ');
    });
    //contextで指定されたアクションを起こした時に関数を呼び出す
    context.subscriptions.push(getJson);
    //helloOriginal
    let helloOriginal = vscode.commands.registerCommand('hiding-twitter-4.helloOriginal', () => {
        //ワークスペースが開かれていない時に動くとエラーが出るので、IF文を用いる
        if (name) {
            //ボタンを押された時に表示を変更したいため、ここでもTextを変更させる
            myStatusBarItem.text = `$(sync~spin) 読み込み中`;
            myStatusBarItem.show();
            //getPassからpromiseの型を返してもらう
            const getPromise = getPass();
            //プロミスは度非同期処理を行うタイミングで、ちゃんと処理が終了したタイミングで動作をしてくれる関数。
            //getPromise.then(非同期処理)が終わったタイミングでdataを返す「
            getPromise.then(data => {
                //ここからファイルを作成して、表示するコード
                //ファイルのインスタンス化
                var fs = require("fs");
                var path = require('path');
                //ファイルの作るパスを指定して、twitter.jsonを作成する
                const filePath = path.join(vscode.workspace.rootPath, 'twitter.json');
                //実際のファイルの中身を作成する(どんなデータを出力するか)
                fs.writeFileSync(filePath, data, 'utf8');
                //ファイルのパスを指定
                const openPath = vscode.Uri.file(filePath);
                //VSCodeで開いてもらう
                //openTextDocument(openPath)が終わった時docをvscode.window.showTextDocumentに引数として渡す
                vscode.workspace.openTextDocument(openPath).then(doc => {
                    //filepathを開く
                    vscode.window.showTextDocument(doc);
                });
                // const settings = vscode.workspace.getConfiguration("hiding-twitter-4");
                // const setAsGlobal = (settings.inspect("oauth_token")!.workspaceValue === undefined);
                // settings.update("oauth_token", "hoge",setAsGlobal); // myParamをhogeに変更
                const conf = vscode.workspace.getConfiguration('hiding-twitter-4');
                vscode.window.showInformationMessage('hiding-twitter-4.oauth_token: ' + conf.get('oauth_token'));
                //処理が終了したらステータスバーの見た目を元に戻す
                myStatusBarItem.text = `${icon} Twitter`;
                myStatusBarItem.show();
            }, (error) => {
                console.error("error:", error.message);
                //処理が終了したらステータスバーの見た目を元に戻す
                myStatusBarItem.text = `${icon} Twitter`;
                myStatusBarItem.show();
            });
        }
        vscode.window.showInformationMessage('JsonをTextに貼り付けたよ');
    });
    context.subscriptions.push(helloOriginal);
    const handleUri = (uri) => {
        const queryParams = new URLSearchParams(uri.query);
        if (queryParams.has('say')) {
            vscode.window.showInformationMessage(`URI Handler says: ${queryParams.get('say')}`);
        }
    };
    context.subscriptions.push(vscode.window.registerUriHandler({
        handleUri
    }));
}
exports.activate = activate;
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map