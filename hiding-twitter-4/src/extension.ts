import * as vscode from 'vscode';
import axios, { AxiosResponse } from "axios";
import { type } from "os";


type FamousSaying = {
  auther: string;
  meigen: string;
};


//実際にApiを叩く部分
//async:非同期通信で別の場所で作業して結果だけメインに送る
//Promise型:非同期処理が完了した時結果を返したり、エラーを送る
async function getPass(oauthToken="", oauthVerifier=""): Promise<string> {
	try{

		const request = "?oauth_token=" + oauthToken + "&oauth_verifier=" + oauthVerifier;

		//ここで、Apiを叩いて、パースもしてくれている
		const { data, status } = await axios.get<TweetArray>(
			//本番はこのURLも変える
				'http://setwitter.harutiro.net:5001/get'+request,
				{
					//受け取るデータの情報
					headers: {
					// eslint-disable-next-line @typescript-eslint/naming-convention
					'Content-Type': 'application/json'
				},
			},
		);

		//パースしたデータを逆にJsonに戻している
		//JSON.stringify()は、JavaScriptオブジェクトを取得し、JSON 文字列に変換します
		//1つ目は出力したいデータで、2つ目は文字列または数値を、返された文字列のスペース（インデント）として使用します
		console.log(JSON.stringify(data, null, 4));

		//パースしたデータをコンソールに流す
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
	}catch(error){
		console.log('error');
		return 'error';
	}
	
}

//実際にApiを叩く部分
//async:非同期通信で別の場所で作業して結果だけメインに送る
//Promise型:非同期処理が完了した時結果を返したり、エラーを送る
async function getResult(oauthToken="", oauthVerifier=""): Promise<number> {
	try{
		const request = "?oauth_token=" + oauthToken + "&oauth_verifier=" + oauthVerifier;

		//ここで、Apiを叩いて、パースもしてくれている
		const { data, status } = await axios.get<Result>(
			//本番はこのURLも変える
				'http://setwitter.harutiro.net:5001/result'+request,
				{
					//受け取るデータの情報
					headers: {
					// eslint-disable-next-line @typescript-eslint/naming-convention
					'Content-Type': 'application/json'
				},
			},
		);



		console.log('response status is: ', status);

		//JSONに受け取ったデータを書き出す
		//JSON.stringify()は、JavaScriptオブジェクトを取得し、JSON 文字列に変換します
		//1つ目は出力したいデータで、2つ目は文字列または数値を、返された文字列のスペース（インデント）として使用します
		return data.result;

		//エラーが起きた時の処理
	}catch(error){
		console.log('error');
		return -1;
	}
	
}
//実際にApiを叩く部分
//async:非同期通信で別の場所で作業して結果だけメインに送る
//Promise型:非同期処理が完了した時結果を返したり、エラーを送る
async function getToken(): Promise<string> {
	try{
		//ここで、Apiを叩いて、パースもしてくれている
		const { data, status } = await axios.get<Token>(
			//本番はこのURLも変える
				'http://setwitter.harutiro.net:5001/twitter/request_token',
				{
					//受け取るデータの情報
					headers: {
					// eslint-disable-next-line @typescript-eslint/naming-convention
					'Content-Type': 'application/json'
				},
			},
		);


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
	}catch(error){
		console.log('error');
		return 'error';
	}
	
}


//実際にApiを叩く部分
//async:非同期通信で別の場所で作業して結果だけメインに送る
//Promise型:非同期処理が完了した時結果を返したり、エラーを送る
async function setFavorite(oauthToken="", oauthVerifier="",tweetId=0): Promise<string> {
	try{
		//ここで、Apiを叩いて、パースもしてくれている

		const request = "?oauth_token=" + oauthToken + "&oauth_verifier=" + oauthVerifier + "&id=" + tweetId;

		const { data, status } = await axios.get<Token>(
			//本番はこのURLも変える
				'http://setwitter.harutiro.net:5001/favorite'+request,
				{
					//受け取るデータの情報
					headers: {
					// eslint-disable-next-line @typescript-eslint/naming-convention
					'Content-Type': 'application/json'
				},
			},
		);


		//APiを取得した時の状態を表示してくれている
		//成功したら200を返してくれる。
		//ページがなかったときは404とか
		//通信プロトコル

		console.log('response status is: ', status);

		//JSONに受け取ったデータを書き出す
		//JSON.stringify()は、JavaScriptオブジェクトを取得し、JSON 文字列に変換します
		//1つ目は出力したいデータで、2つ目は文字列または数値を、返された文字列のスペース（インデント）として使用します
		return JSON.stringify(data, null, 4);;

		//エラーが起きた時の処理
	}catch(error){
		console.log('error');
		return 'error';
	}
	
}

//================================================================================
//盛り上がり度の取得
//================================================================================
function getExcitement(myStatusBarItem: vscode.StatusBarItem,name:string|undefined,icon: "$(debug)" | "$(icon-fire)"){
		//ここは、1秒に一回時間取得を読んでくれる部分
		//本番では、2分に一回盛り上がり度を取得するコードに変更する
		//２分に一回APIを呼び出すように変更
		let printDate = function () {

			const conf = vscode.workspace.getConfiguration('hiding-twitter-4');
			// vscode.window.showInformationMessage('hiding-twitter-4.oauth_token: ' + conf.get('oauth_token'));
			// vscode.window.showInformationMessage('hiding-twitter-4.oauth_token: ' + conf.get('oauth_verifier'));

			const getresult = getResult(conf.get('oauth_token'),conf.get('oauth_verifier'));

			vscode.window.showInformationMessage('盛り上がりどの取得');

			getresult.then(result => {

				if (name) {
					//ここでステータスバーの文字列を指定している
					myStatusBarItem.text = `${icon} Twitter ${result}%`;
					myStatusBarItem.show();
				}

			}, (error) => {
				console.log(error);
			});
		};
		//ここで間隔を指定している
		setInterval(printDate,10000);
		printDate();
}


export function activate(context: vscode.ExtensionContext) {

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
	//TL取得ボタン
	const getTimeLineCommandId = 'hiding-twitter-4.getTimeLine';
	myStatusBarItem.command = getTimeLineCommandId;
	//マウスをかざした時のヒントを表示する
	myStatusBarItem.tooltip = `TLの取得`;
	context.subscriptions.push(myStatusBarItem);


	
	console.log('Congratulations, your extension "hiding-twitter-4" is now active!');

	//================================================================================
	//盛り上がり度の取得
	//================================================================================
	// getExcitement(myStatusBarItem,name,icon);


	//================================================================================
	//ログイン部分
	//================================================================================
	let getLoginToken = vscode.commands.registerCommand('hiding-twitter-4.getLoginToken', () => {
		//上のメラメラアイコンを押した時にJSonを取得するコード
		const geturl = getToken();

		geturl.then(url => {
			vscode.env.openExternal(vscode.Uri.parse(url));
		}, (error) => {
			console.log(error);
		});
	});
	//contextで指定されたアクションを起こした時に関数を呼び出す
	context.subscriptions.push(getLoginToken);


	//================================================================================
	//いいね機能
	//================================================================================
	let postFavorite = vscode.commands.registerCommand('hiding-twitter-4.postFavorite', () => {
		const conf = vscode.workspace.getConfiguration('hiding-twitter-4');
		// vscode.window.showInformationMessage('hiding-twitter-4.oauth_token: ' + conf.get('oauth_token'));
		// vscode.window.showInformationMessage('hiding-twitter-4.oauth_token: ' + conf.get('oauth_verifier'));


		const hello = setFavorite(conf.get('oauth_token'),conf.get('oauth_verifier'),1545914408152359000);

		hello.then(data => {
			vscode.window.showInformationMessage(data);
			console.log(data);

		}, (error) => {
			console.log(error);
		});

	});
	context.subscriptions.push(postFavorite);

	//================================================================================
	//TLの取得
	//================================================================================
	let getTimeLine = vscode.commands.registerCommand('hiding-twitter-4.getTimeLine', () => {

		const conf = vscode.workspace.getConfiguration('hiding-twitter-4');
		// vscode.window.showInformationMessage('hiding-twitter-4.oauth_token: ' + conf.get('oauth_token'));
		// vscode.window.showInformationMessage('hiding-twitter-4.oauth_token: ' + conf.get('oauth_verifier'));
		//ワークスペースが開かれていない時に動くとエラーが出るので、IF文を用いる
		if (name) {
			//ボタンを押された時に表示を変更したいため、ここでもTextを変更させる
			myStatusBarItem.text = `$(sync~spin) 読み込み中`;
			myStatusBarItem.show();

			//getPassからpromiseの型を返してもらう
			
			const getPromise = getPass(conf.get('oauth_token'),conf.get('oauth_verifier'));

			//プロミスは度非同期処理を行うタイミングで、ちゃんと処理が終了したタイミングで動作をしてくれる関数。
			//getPromise.then(非同期処理)が終わったタイミングでdataを返す「
			getPromise.then(data => {
				//ここからファイルを作成して、表示するコード
				//ファイルのインスタンス化
				var fs=require("fs");
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

		

	});
	context.subscriptions.push(getTimeLine);


	const handleUri = (uri: vscode.Uri) => {
		const queryParams = new URLSearchParams(uri.query);
		if (queryParams.has('oauth_token')) {
			// vscode.window.showInformationMessage(`URI Handler says: ${queryParams.get('oauth_token') as string}`);

			const settings = vscode.workspace.getConfiguration("hiding-twitter-4");
			const setAsGlobal = (settings.inspect("oauth_token")!.workspaceValue === undefined);
			settings.update("oauth_token",queryParams.get('oauth_token') ,setAsGlobal); // myParamをhogeに変更
		}
		if (queryParams.has('oauth_verifier')) {
			// vscode.window.showInformationMessage(`URI Handler says: ${queryParams.get('oauth_verifier') as string}`);

			const settings = vscode.workspace.getConfiguration("hiding-twitter-4");
			const setAsGlobal = (settings.inspect("oauth_verifier")!.workspaceValue === undefined);
			settings.update("oauth_verifier",queryParams.get('oauth_verifier') ,setAsGlobal); // myParamをhogeに変更
		}

		vscode.window.showInformationMessage(`ログインしました。`);

	};
	context.subscriptions.push(
		vscode.window.registerUriHandler({
			handleUri
		})
	);


	//================================================================================
	//ターミナルで作業してるように見せる機能
	//================================================================================
	let displayInTerminal = vscode.commands.registerCommand("hiding-twitter-4.displayInTerminal", async () => {

    //現在開いているタブを閉じる
    await vscode.commands.executeCommand('workbench.action.closeActiveEditor');

		//変数の宣言
		var terminal = vscode.window.createTerminal();

		//ctrl + Enter で topまたはtasklist を自動で入力する関数
		const typeCommand = async () => {
			//自動でvsコードターミナルを開く
			terminal.show();
			//実際にコマンドを叩く
			terminal.sendText("tasklist" + "\n" + "top");
		};

		//関数の呼び出し
		typeCommand();
	});

	context.subscriptions.push(displayInTerminal);
}


		

// this method is called when your extension is deactivated
export function deactivate() {}

//vscode.window.tabGroups.all.forEach((tab)