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
