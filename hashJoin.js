/**
 * Created by samarpreet on 19/03/17.
 */
String.prototype.hashCode = function() {
    var hash = 0, i, chr;
    if (this.length === 0) return hash;
    for (i = 0; i < this.length; i++) {
        chr   = this.charCodeAt(i);
        hash  = ((hash << 5) - hash) + chr;
        hash |= 0; // Convert to 32bit integer
    }
    return hash;
};
var module = function () {

    function start(key) {
        var nameList =h();
        var marksList = e();
        return hashJoin(nameList,marksList,key);
    }
    function hashJoin(nameTable,marksTable,key) {
        var hashTable = generateHashTable(nameTable,key);
        return loop(marksTable,hashTable,key);
    }

    function loop(table,hashTable,key) {
        let result = new Array();
        table.forEach((record)=>{
            let hashCode = record.get(key).toString().hashCode();
            let nameTableRecord = hashTable[hashCode];
            let temp =  new Object();
            temp[key] = record.get(key);
            temp['name'] = nameTableRecord.get('name');
            temp['marks'] = record.get('marks');
            result.push(temp);
        })
        return result;
    }

    function generateHashTable(table,key){
        var hashTable=new Array();
        table.forEach(function (record) {
            var temp = record.get(key).toString();
            var hashCode = temp.hashCode();
            hashTable[hashCode] = record;
        });
        return hashTable;
    }

    function h() {
        var temp=[];
        for(var i=0;i<1000000;i++){
            var m=new Map();
            m.set('id',i); m.set('name','a'+ i);
            temp.push(m)
        };
        return temp;
    }
    function e() {
        var temp=[];
        for(var i=0;i<100000;i++){
            var m=new Map();
            m.set('id',i); m.set('marks',i*50);
            temp.push(m)
        };
        return temp;
    }
    return{
        start:start
    }
}

var result = module().start('id');
console.log(result);
