import request from '@/utils/http';




export const insertCartAPI = ({ skuId, count }) => {
    return request({
        url: '/member/cart',
        method: 'post',
        data: {
            skuId,
            count
        }
    })
}

export const findNewCartListAPI = () => {
    return request({
        url: '/member/cart',
    })
}

export const delCartAPI = (ids) => {
    return request({
        url: '/member/cart',
        method: 'DELETE',
        data: {
            ids
        }
    })
}

//合并购物车

export const mergeCartAPI = (data) => {
    return request({
        url: '/member/cart/merge',
        method: 'post',
        data
    })
}