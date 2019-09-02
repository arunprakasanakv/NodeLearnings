const db = require('../config/db');
module.exports = {
    select:function(columns,tableName,conditions){
        return new Promise(function(resolve, reject) {
            var result = getSelectQuery(columns,tableName,conditions);
            db.query(result,function(err,results,fields){
				if (err) {
                    reject(err);
                    throw err;
                }
                resolve(results);
            });
        });
    },
    insert:function(columnsAndValues,tableName){
        return new Promise(function(resolve, reject) {
            var result = getInsertQuery(tableName,columnsAndValues);
            db.query(result,function(err,results,fields){
				if (err) {
                    reject(err);
                    throw err;
                }
                resolve(results);
            });
        });
    },
    update:function(columns,tableName,conditions){
        return new Promise(function(resolve, reject) {
            var result = getUpdateQuery(columns,tableName,conditions);
            db.query(result,function(err,results,fields){
				if (err) {
                    reject(err);
                    throw err;
                }
                resolve(results);
            });
        });
    },
    delete:function(tableName,conditions){
        return new Promise(function(resolve, reject) {
            var result = getDeleteQuery(tableName,conditions);
            db.query(result,function(err,results,fields){
				if (err) {
                    reject(err);
                    throw err;
                }
                resolve(results);
            });
        });
    }
}

function getSelectQuery(columns,table,conditions){
    var query;
    var condition;
    var column = parseColumn(columns);
    if(column == null){
        query = "SELECT "+column+" FROM "+table;
    } else{
        condition = parseCondition(conditions);
        query = "SELECT "+column+" FROM "+table +" WHERE "+condition;
    }
    return query;
}

function parseColumn(column_names){
    var colum_sql = "";
    var columnNames;
    var type = typeof column_names;
    columnNames = column_names; 
    if(typeof columnNames === "object" && Array.isArray(columnNames)){
        var i = 1;
        for(var column_name in columnNames){
            console.log(column_name);
            if(i == 1){
                colum_sql = columnNames[column_name];
                ++i;
            } else{
                colum_sql = colum_sql+","+columnNames[column_name]  ;
            }
        }
    } else{
        colum_sql = column_names;
    }
    return colum_sql;
}
function parseCondition(column_names){
    var condition_sql = "";
    var columnNames;
    var type = typeof column_names;
    columnNames = column_names;
    if(type === "object"){
        var i = 1;
        Object.entries(columnNames).forEach(([column_name, column_value]) => {
            if(i == 1){
                condition_sql = column_name +" = '"+ column_value+"'";
                ++i;
            } else{
                condition_sql = condition_sql+" AND "+column_name +" = '"+ column_value+"'";
            }
        });
    } else{
        condition_sql = column_names;
    }
    return condition_sql;
}
function getInsertQuery(tableName, columnNamesAndValues){
    var sql = "INSERT INTO ";
    var totalColumnName;
    var totalColumnValue;
    var tempColumnValue;
    if(tableName != null){
        sql = sql+tableName;
    }
    var j = 1;
    columnNamesAndValues.forEach(function(item){
        var i = 1;
        Object.entries(item).forEach(([column_name, column_value]) => {
            if(i == 1){
                if(j==1){
                    totalColumnName = '`'+column_name+'`';
                }
                tempColumnValue = '`'+column_value+'`';
                ++i;
            } else{
                if(j==1){
                    totalColumnName = totalColumnName+', `'+column_name+'`';
                }
                tempColumnValue = tempColumnValue+', `'+column_value+'`';
            }
        });
        var temp = "("+tempColumnValue+")";
        if(j == 1){
            totalColumnValue = temp;
        } else {
            totalColumnValue = totalColumnValue+","+temp;
        }
        ++j;
    });
    return sql+" ( "+totalColumnName+" ) VALUES "+totalColumnValue;
}
function getUpdateQuery(column_names, table_name, conditions){
    var column = updateParseColumn(column_names);
    var query;
    if(conditions == null){
        query = "UPDATE "+table_name+" SET "+column;
    } else{
        var condition = parseCondition(conditions);
        query = "UPDATE "+table_name +" SET "+column+" WHERE "+condition;
    }
    return query;
}
function updateParseColumn(columnNames){
    var type = typeof columnNames;
    var colum_sql;
    if(type === "object"){
        var i = 1;
        Object.entries(columnNames).forEach(([column_name, column_value]) => {
            if(i == 1){
                colum_sql = column_name +" = '"+ column_value+"'";
                ++i;
            } else{
                colum_sql = colum_sql+" ,"+column_name +" = '"+ column_value+"'";
            }
        });
    } else{
        colum_sql = columnNames;
    }
    return colum_sql;
}
function getDeleteQuery(table_name, condition){
    var type = typeof condition;
    var sql = "DELETE FROM ";
    if(table_name != null){
        sql = sql+'`'+table_name+"` WHERE ";
    }
    if(type === "object"){
        var i = 1;
        Object.entries(condition).forEach(([column_name, column_value]) => {
            if(i == 1){
                sql = sql+"`"+column_name+"` = "+'"'+column_value+'"';
                ++i;
            } else{
                sql = sql+" AND `"+column_name+"` = "+'"'+column_value+'"';
            }
        });
    } else{
        sql = sql + condition;
    }
    return sql;
}
