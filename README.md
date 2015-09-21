NodeJS server that can be called from Qlikview and will trigger task in Qlik Sense

### Config and setup

* clone/download the repo
* run `npm install`
* rename `config_example.js` to `config.js`
* edit `config.js` to match your environment
* paste the exported cerficates from qmc in the `\cert` folder
* in cmd type `node server.js`

### Usage

After the previous steps are completed and the server is running you can call the server like this:
```
ReloadQSTask:
Load 
    guid, 
    error
From
  [http://localhost:8000/start/task/My-QS-Task-Name] (txt, codepage is 1252, embedded labels, delimiter is ',', msq);

Drop Table ReloadQSTask;
```

If everything is ok the value in the `quid` field should be like this: 45f8de72-f08e-4f3a-8411-cb569c715fcb and the `error` field should be empty


### Why?

We had an issue connecting from our Sense server to one of our databases (not Sense issue but network issue). And since this is resolved we decided to extract the data from our Qlikview server (which dont had the connection issue), store the data in qvds and reload QS app that read from the qvds. But since the process, which prepare the data in the first place, is not finishing at exact time every day we needed a link between QV and QS. This small Node js server is the link. After the data is extracted from QV the qv script above is called and it trigger the QS reload task that is needed. 
