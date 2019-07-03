// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()
const cartCollection = db.collection('Cart')

exports.main = async (event, context) => {
    let order = await cartCollection.where({
        openId: event.openId,
        goodsId: event.goodsId,
        skuVal:event.skuVal
    }).get();
    let totalPrice = order.data[0].price * order.data[0].orderNum;
    order['totalPrice'] = totalPrice;
    return order;
}