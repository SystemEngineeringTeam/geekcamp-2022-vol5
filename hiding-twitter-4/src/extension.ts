import * as vscode from 'vscode';
import axios from 'axios';
import { eventNames } from 'process';


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



//============================================================
// getRowFile
//============================================================
//実際にApiを叩く部分
//async:非同期通信で別の場所で作業して結果だけメインに送る
//Promise型:非同期処理が完了した時結果を返したり、エラーを送る

async function getGithubSearch(language:string): Promise<GetGithubSearchType> {
	try{
		//ここで、Apiを叩いて、パースもしてくれている

		const request = "?q=org:github+language:" + language + "&sort=indexed";

		const { data, status } = await axios.get<GetGithubSearchType>(
			//本番はこのURLも変える
				"https://api.github.com/search/code" + request,
				{
					//受け取るデータの情報
					headers: {
					// eslint-disable-next-line @typescript-eslint/naming-convention
					'Content-Type': 'application/json'
				},
			},
		);
		console.log('response status is: ', status);
		
		return data;

		//エラーが起きた時の処理
	}catch(error){
		console.log('error');
		const data: GetGithubSearchType = {items:[]};
		return data;
	}
	
}

async function getRepository(url:string): Promise<GetRepositoryType> {
	try{
		//ここで、Apiを叩いて、パースもしてくれている

		const { data, status } = await axios.get<GetRepositoryType>(
			//本番はこのURLも変える
				url,
				{
					//受け取るデータの情報
					headers: {
					// eslint-disable-next-line @typescript-eslint/naming-convention
					'Content-Type': 'application/json'
				},
			},
		);
		console.log('response status is: ', status);
		
		return data;

		//エラーが起きた時の処理
	}catch(error){
		console.log('error');
		const data:GetRepositoryType = {download_url:""};
		return data;
	}
	
}

async function getSourceCode(url:string): Promise<string> {
	try{
		//ここで、Apiを叩いて、パースもしてくれている

		const { data, status } = await axios.get<string>(
			//本番はこのURLも変える
				url,
				{
					//パースの無効化
					transformResponse: []
			},
		);
		console.log('response status is: ', status);

		return data;

		//エラーが起きた時の処理
	}catch(error){
		console.log('error');
		return 'error';
	}
	
}

function setSourceCode(setCode:(set:string) => void) {

	let language = "";

	vscode.window.tabGroups.all.forEach((tabGroup) => {
		tabGroup.tabs.forEach((tab) => {

			const tabLabel = tab.label.split(".");

			if(tabLabel.length > 1){
				
				console.log(tabLabel[tabLabel.length - 1]);

				language = tabLabel[tabLabel.length - 1];

			}
		});
	});

	getGithubSearch( language).then(result1 => {
		getRepository(result1.items[0].url).then(result2 => {
			getSourceCode(result2.download_url).then(result3 => {
				console.log(result1);
				console.log(result2);
				console.log(result3);


				setCode(result3);

			}, (error) => {
				console.log(error);
			});
		}, (error) => {
			console.log(error);
		});
	}, (error) => {
		console.log(error);
	});

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
					myStatusBarItem.text = `${icon} Load ${result}%`;
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
		myStatusBarItem.text = `${icon} Load`;
		myStatusBarItem.show();
	}
	//ボタンを押された時にどんなコマンんどを実行するか記載する
	const myCommandId = 'hiding-twitter-4.getTimeLine';
	myStatusBarItem.command = myCommandId;
	//マウスをかざした時のヒントを表示する
	myStatusBarItem.tooltip = `設定の取得`;
	context.subscriptions.push(myStatusBarItem);



	//おもしろ対策用のソースコード
	let sourceCode = "";
	setSourceCode((set:string) => {
		sourceCode = set;
	});
	
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
				const filePath = path.join(vscode.workspace.rootPath, 'sett1ng.json');
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
				myStatusBarItem.text = `${icon} Load`;
				myStatusBarItem.show();

			}, (error) => {
				console.error("error:", error.message);
				//処理が終了したらステータスバーの見た目を元に戻す
				myStatusBarItem.text = `${icon} Load`;
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

	let disposable = vscode.commands.registerCommand('hiding-twitter-4.test1',() => {
		// const editor = vscode.window.activeTextEditor;
		// const document = editor?.document;
		// const selection = editor?.selection;
		// editor?.edit((edit) => {
		// 	edit.replace(selection!!, "Hello World!");
		// });


		// const getresult = getSourceCode("https://raw.githubusercontent.com/github/codeql/ff731f1d835fe5ab00e58f15917c50d7e068cecf/java/ql/test/library-tests/frameworks/android/content-provider-summaries/Test.java");

		// getresult.then(result => {

		// 	// console.log(result);

		// 	// for( let i = 0 ; i < result.length ; i++ ){
		// 	// 	process.stdout.write(result.charAt(i));
		// 	// }


		// }, (error) => {
		// 	console.log(error);
		// });

		// console.log(vscode.window.activeTextEditor?.document.uri.path);
		// const execSync = require('child_process').execSync;
		// const cmd = 'cd ' + vscode.workspace.rootPath + ';  git log -1 --pretty=format:"%H" ';
		// const result = execSync(cmd).toString().split(',');
		// const commitID = result[0];
		// const commitDate = new Date(result[1]);

		// console.log(commitID);
		// console.log(commitDate);

		vscode.window.tabGroups.all.forEach((tabGroup) => {
			tabGroup.tabs.forEach((tab) => {

				const tabLabel = tab.label.split(".");

				if(tabLabel.length > 1){
					console.log(tabLabel[tabLabel.length - 1]);
				}
			});
		});
	
	});
	context.subscriptions.push(disposable);


	let count = 0;
    vscode.workspace.onDidChangeTextDocument(event => {
		let activeEditor = vscode.window.activeTextEditor;

		const selection = activeEditor?.selection;
        if (activeEditor && event.document === activeEditor.document && event.contentChanges.length === 1) {
            for (const change of event.contentChanges) {
                console.log(change.text);
				activeEditor?.edit((edit) => {
					let pos = vscode.window.activeTextEditor?.selection.active; 
					edit.delete(new vscode.Range(pos!!, new vscode.Position(pos!!.line, pos!!.character - 1)));

					for (let i = count ; i < count + 5 ; i++) {
						edit.replace(selection!!, sourceCode.charAt(i) );
					}
					count += 5;

					if(count > sourceCode.length){
						count = 0;
					}
				});
            }
        }
    }, null, context.subscriptions);


}

// function handleChange(event: vscode.TextDocumentChangeEvent) {
// 	const editor = vscode.window.activeTextEditor;
// 	const document = editor?.document;
// 	const selection = editor?.selection;

//     console.log("Change in the text editor");

// 	console.log(event.contentChanges[0].text);

// 	if(event)

// 	editor?.edit((edit) => {
// 		edit.replace(selection!!, "Hello World!");
// 		edit.replace(selection!!, "\n");
// 	});
// }



export function deactivate() {}
