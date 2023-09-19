import PusherServer from 'pusher'
import PusherClient from 'pusher-js'

export const pusherServer = new PusherServer({
    appId: '1607086',
    key: 'acfd61d13dbc8435547a',
    secret: '36beb987ef0f254ac0b2',
    cluster: 'eu',
    useTLS: true
})

export const pusherClient = new PusherClient(
    'acfd61d13dbc8435547a',
    {
        cluster: 'eu'
    }
)

