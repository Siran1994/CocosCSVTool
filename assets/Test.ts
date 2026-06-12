import { _decorator, Component, Node } from 'cc';
import { CsvManager } from './CsvManager';
const { ccclass, property } = _decorator;

@ccclass( 'Test' )
export class Test extends Component
{
    start ()
    {
        CsvManager.Instance.LoadCsv( () =>
        {
            console.error( CsvManager.Instance.getTable( 'task' ) );
            console.error( CsvManager.Instance.queryByID( 'task', '0' ) );

            console.error( CsvManager.Instance.getTableArr( 'task' ) );



            const row = CsvManager.Instance.queryByID( 'task', '2' );
            if ( row )
            {
                console.error( `id: ${ row.id }` ); // 输出: 2
                console.error( `tip: ${ row.tip }` ); // 输出: 售卖物资
            }



            // 注意：csv解析后，TRUE/false 会被转为 布尔类型
            const rows = CsvManager.Instance.queryAll( 'task', 'focus', true );
            // 遍历结果 (rows 是一个对象，需要用 Object.values 或者 for...in 遍历)
            for ( const key in rows )
            {
                const item = rows[ key ];
                console.error( `找到任务条件为True的ID: ${ item.id }, 内容: ${ item.tip }` );
            }

            // 转换为数组
            const resultArr = Object.keys( rows ).map( key => rows[ key ] );
            // 现在可以使用数组方法
            resultArr.forEach( item =>
            {
                console.error( item.tip );
                console.error( item.nextTask );
                console.error( item.icon );
                if ( item.focus == true )
                    console.error( '对的' );
                else
                    console.error( '错的' );
                console.error( item.taskConsume );
                console.error( item.taskReward[ 0 ] );
            } );

        } );//Excel表格使用示例       
    }

}

