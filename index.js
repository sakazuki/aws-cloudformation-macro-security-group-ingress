exports.handler = async (event) => {
  console.log(event)
  if (event.params.AllowPorts) {
    const ingress = []
    for (const item of event.params.AllowPorts) {
      const [fromPort, toPort = fromPort] = item.split('-')
      ingress.push({
        IpProtocol: 'tcp',
        FromPort: fromPort,
        ToPort: toPort,
        CidrIp: '0.0.0.0/0'
      })
    }
    event.fragment = ingress
  }
  return {
    requestId: event.requestId,
    status: 'success',
    fragment: event.fragment
  }
}
