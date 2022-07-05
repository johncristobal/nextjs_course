import mongoose from 'mongoose';

// 0 disconnected
// 1 connected
// 2 connecting

const mongooConn = {
    isConnected: 0 
    
}

export const connect = async() => {
    if(mongooConn.isConnected){
        console.log("Ya estabamos conectados")
        return
    }

    if (mongoose.connections.length > 0){
        mongooConn.isConnected = mongoose.connections[0].readyState

        if(mongooConn.isConnected === 1){
            console.log("Usando conexion anterior")
            return
        }

        await mongoose.disconnect();
    }

    await mongoose.connect(process.env.URL_CONN || '');
    mongooConn.isConnected = 1
    console.log("Conectado...", process.env.URL_CONN)
}

export const disconnect = async () => {

    if (process.env.NODE_ENV === 'development') return;
    if(mongooConn.isConnected === 0) return;
    await mongoose.disconnect();
    console.log("Desconectado...")
}