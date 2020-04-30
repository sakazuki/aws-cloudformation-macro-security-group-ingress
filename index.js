exports.handler = async (event) => {
  console.log(event)
  if (event.params.AllowPorts) {
    const ingress = []
    const cidrIp = event.params.AllowCidr || '0.0.0.0/0'
    for (const item of event.params.AllowPorts) {
      const [fromPort, toPort = fromPort] = item.split('-')
      ingress.push({
        IpProtocol: 'tcp',
        FromPort: fromPort,
        ToPort: toPort,
        CidrIp: cidrIp
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
