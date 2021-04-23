const localhost = 'http://localhost:3000';
function getRays(link, cb) {
  const dataGetRays = { link };
  
  const requestRays = $.ajax({
    url: localhost + '/create',
    type: 'POST',
    data: JSON.stringify(dataGetRays),
    contentType: 'application/json; charset=utf-8'
  })
  
  requestRays.done(cb);
}

function getLink(rays, cb) {
  const dataGetLink = { rays };
  
  const requestLink = $.ajax({
    url: localhost + '/decode',
    type: 'POST',
    data: JSON.stringify(dataGetLink),
    contentType: 'application/json; charset=utf-8'
  })
  
  requestLink.done(cb)
}

getRays('https://www.youtube.com/watch?v=YSsNFP6TVHY');