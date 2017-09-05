var header=Buffer.from([0,0,0,0,0]);
var buscode={"READ_INPUT":0x04,"READ_STATE":0x02,"WRITE_N_COIL":0x0f,"WRITE_N_HOLD":0x10,"WRITE_N_COIL":0x0f,"WRITE_1_COIL":0x05}
 function modbus(){
 	
 }

modbus.prototype.READ=function(fun,add,start,num){
	var add=Buffer.from([add,buscode[fun]]);
	var codebody=Buffer.concat([add,this.calh(start),this.calh(num)]);
	var clength=Buffer.from([codebody.length]);
	return Buffer.concat([header,clength,codebody]);
}


modbus.prototype.WRITE_N_HOLD=function(add,start,num,data){
	var add=Buffer.from([add,buscode.WRITE_N_HOLD]);
	var dlength=data.length*2;//数据格式[0x0000,0x0011]
	var codebody=Buffer.concat([add,this.calh(start),this.calh(num),Buffer.from(dlength),Buffer.from(data)]);
	var clength=Buffer.from([codebody.length]);
	return Buffer.concat([header,clength,codebody]);
}

modbus.prototype.WRITE_N_COIL=function(add,start,num,data){
	var add=Buffer.from([add,buscode.WRITE_N_COIL]);
	var dlength=data.length*4;//数据格式[0x00,0x01]
	var codebody=Buffer.concat([add,this.calh(start),this.calh(num),Buffer.from(dlength),Buffer.from(data)]);
    return Buffer.concat([header,clength,codebody]);
}

modbus.prototype.WRITE_1_COIL=function(add,start,data){
	var add=Buffer.from([add,buscode.WRITE_1_COIL]);//数据格式[0x0000]
	var codebody=Buffer.concat([add,this.calh(start),this.calh(num),Buffer.from(dlength),Buffer.from(data)]);
    return Buffer.concat([header,clength,codebody]);
}
modbus.prototype.calh=function(num){
	if(num<=0xff){
		return Buffer.from([0X00,num]);
	}
	else{
		var numh=num>>8;
		var numl=num&0x00ff;
		return Buffer.from([numh,numl]);
	}
}


module.exports=exports=modbus;
