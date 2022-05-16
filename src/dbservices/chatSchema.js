const schema = {
  title: 'chatInfo schema',
  description: 'describes a simple hero',
  version: 0,
  keyCompression: false,
  primaryKey: 'id',
  type: 'object',
  properties: {
    id: {
      type: 'string',
      maxLength: 99999
    },
    msg: {
      type: 'string',
      default: ''
    },
    type: {
      type: 'string',
      default: ''
    },
    room: {
      type: 'string',
      default: ''
      // default: ''
    },
    name: {
      type: 'string',
      default: ''
    },
    user: {
      type: 'string',
      default: ''
    },
    time: {
      type: 'number',
      default: 0
    }
  },
  required: ['id', 'type', 'room', 'time', 'msg']
}

export default schema
