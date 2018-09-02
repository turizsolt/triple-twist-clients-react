import * as io from 'socket.io-client';

export class Server {
    private socket:SocketIOClient.Socket;

    public constructor() {
        console.log("server");
        this.socket = io('http://localhost:8123/');
        this.socket.emit('login', {type: 0});
        this.socket.on('loggedin', (data:any) => {
            console.log("loggedin", data);
        });
    }

    public foo() {
        return this.socket;
    }

}

/*
class Server2{
    private ons; //TODO what is proper type if not [string] nor [any]
    private socket: Socket;
    private config: any;
    private peerType: PeerType;

    public constructor(_type: PeerType, _teamId: number = null, _init: any = {}){
        this.ons = [];
        this.config = globalConfig;
        this.peerType = _type;

        this.login(_type, _teamId);
        this.initSubscribes(_type, _init);
    }

    public getPeerType():PeerType{
        return this.peerType;
    }


    private login(_type: PeerType, _teamId: number) {
        var _connectionData:any = {type: _type};
        if(_teamId || _teamId === 0)_connectionData.teamId = _teamId;

        this.socket = io.connect(this.config.connectTo);
        this.socket.emit('login', _connectionData);

        this.socket.on('loggedin', function (_data) {
            //console.log(_data);
        });
    }

    private initSubscribes(_type: PeerType, _init:any){

        this.subscribePermanently('setState', (_data:any) => {
            //console.log('setState: '+_data);
            loadState(_type, _data.loadInfo);

            // Executes the command that has been arrived at the start
            // TODO can it be optimised to process the same time as the others
            // eg. register these in to the server? will see...
            if(_data.command){
                if(_init[_data.command]){
                    setTimeout(() => { _init[_data.command](_data) }, 400);
                }
            }
        });
    }


    public subscribe(event:string, fn:(data:any)=>void){
        this.ons.push(event);
        this.socket.removeAllListeners(event);
        this.socket.on(event, (data) => {
            //console.log('event '+event+": "+ data);
            fn(data);
        });
    }

    public subscribePermanently(event:string, fn:(data:any)=>void){
        this.socket.removeAllListeners(event);
        this.socket.on(event, fn);
    }

    public send(event:string, data:any){
        //console.log('Sending: '+ event+":"+ data);
        this.socket.emit(event, data);
    }

    public clear(){
        for(var ind in this.ons){
            this.socket.removeAllListeners(this.ons[ind]);
        }
    }
}
*/