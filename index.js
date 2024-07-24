import axios from 'axios'
import * as dotenv from 'dotenv'

dotenv.config()

// All times converted to Military time to match UTC hours + minutes, this differentiates between AM/PM for us

let imageObj = {
  // morning
  firstNewsFive: {
    imageUrl:
      'https://static.forumcomm.com/images/wdayplus-thumbnails/WDAY+First+News+at+5+-+Web+Thumbnail+-+Landscape+-+1920+x+1080.jpg',
    startTime: '450',
    endTime: '510',
  },
  // morning
  firstNewsSix: {
    imageUrl:
      'https://static.forumcomm.com/images/wdayplus-thumbnails/WDAY+First+News+at+6+-+Web+Thumbnail+-+Landscape+-+1920+x+1080.jpg',
    startTime: '550',
    endTime: '610',
  },
  // morning
  firstNewsSaturday: {
    imageUrl:
      'https://static.forumcomm.com/images/wdayplus-thumbnails/WDAY+First+News+Saturday+-+Web+Thumbnail+-+Landscape+-+1920+x+1080.jpg',
    startTime: '650',
    endTime: '710',
  },
  // morning
  firstNewsSunday: {
    imageUrl:
      'https://static.forumcomm.com/images/wdayplus-thumbnails/WDAY+First+News+Sunday+-+Web+Thumbnail+-+Landscape+-+1920+x+1080.jpg',
    startTime: '650',
    endTime: '710',
  },
  // morning
  agWeek: {
    imageUrl:
      'https://static.forumcomm.com/images/wdayplus-thumbnails/AgWeek+TV+-+Web+Thumbnail+-+Landscape+-+1920+x+1080.jpg',
    startTime: '820',
    endTime: '840',
  },
  // morning
  hotMic: {
    imageUrl:
      'https://static.forumcomm.com/images/wdayplus-thumbnails/Hot+Mic+-+1920+x+1080+-+Web+Thumbnail.jpg',
    startTime: '850',
    endTime: '910',
  },
  // morning
  newsEleven: {
    imageUrl:
      'https://static.forumcomm.com/images/wdayplus-thumbnails/WDAY+News+at+11+-+Web+Thumbnail+-+Landscape+-+1920+x+1080.jpg',
    startTime: '1050',
    endTime: '1110',
  },
  // Bison Wednesdays
  bisonMediaZone: {
    imageUrl:
      'https://static.forumcomm.com/images/wdayplus-thumbnails/Bison+Media+Zone+-+Web+Thumbnail+-+Landscape+-+1920+x+1080.jpg',
    startTime: '1020',
    endTime: '1040',
  },
  // Bison Saturday
  bisonGameday: {
    imageUrl:
      'https://static.forumcomm.com/images/wdayplus-thumbnails/Bison+Gameday+-+Web+Thumbnail+-+Landscape+-+1920+x+1080.jpg',
    startTime: '950',
    endTime: '1010',
  },
  // evening
  newsFour: {
    imageUrl:
      'https://static.forumcomm.com/images/wdayplus-thumbnails/WDAY+News+at+4+-+Web+Thumbnail+-+Landscape+-+1920+x+1080.jpg',
    startTime: '1550',
    endTime: '1610',
  },
  // evening
  newsFive: {
    imageUrl:
      'https://static.forumcomm.com/images/wdayplus-thumbnails/WDAY+News+at+5+-+Web+Thumbnail+-+Landscape+-+1920+x+1080.jpg',
    startTime: '1650',
    endTime: '1710',
  },
  // evening
  newsFiveThirty: {
    imageUrl:
      'https://static.forumcomm.com/images/wdayplus-thumbnails/WDAY+News+at+530+-+Web+Thumbnail+-+Landscape+-+1920+x+1080.jpg',
    startTime: '1720',
    endTime: '1740',
  },
  // evening
  newsSix: {
    imageUrl:
      'https://static.forumcomm.com/images/wdayplus-thumbnails/WDAY+News+at+6+-+Web+Thumbnail+-+Landscape+-+1920+x+1080.jpg',
    startTime: '1750',
    endTime: '1810',
  },
  // night
  newsNine: {
    imageUrl:
      'https://static.forumcomm.com/images/wdayplus-thumbnails/WDAY+News+at+9+thumbnail.png',
    startTime: '2050',
    endTime: '2110',
  },
  // night
  newsTen: {
    imageUrl:
      'https://static.forumcomm.com/images/wdayplus-thumbnails/WDAY+News+at+10+-+Web+Thumbnail+-+Landscape+-+1920+x+1080.jpg',
    startTime: '2150',
    endTime: '2210',
  },
}

const getJwplayerMedia = async (siteId, mediaId) => {
  const response = await axios({
    method: 'get',
    url: `https://api.jwplayer.com/v2/sites/${siteId}/media/${mediaId}/`,
    headers: {
      accept: 'application/json',
      Authorization: process.env.JWPLAYER_SECRET,
    },
  })
    .then((response) => {
      return response.data
    })
    .catch((error) => {
      if (error.response) {
        return {
          error: {
            status: error.response.status,
            data: error.response.data,
          },
        }
      } else {
        return 'Error', error.message
      }
    })
  return response
}

const updateJwplayerMedia = async (siteId, mediaId, customParams) => {
  const response = await axios({
    method: 'PATCH',
    url: `https://api.jwplayer.com/v2/sites/${siteId}/media/${mediaId}/`,
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      Authorization: process.env.JWPLAYER_SECRET,
    },
    data: {
      metadata: {
        title: customParams.title,
        custom_params: {
          status: customParams.status,
          contentType: customParams.contentType,
          free: customParams.free,
          livestream_channel_id: customParams.livestream_channel_id,
          requires_authentication: customParams.requires_authentication,
          thumbnail_id: customParams.thumbnail_id,
        },
      },
    },
  })
    .then((response) => {
      return response.date
    })
    .catch((error) => {
      if (error.response) {
        return {
          error: {
            status: error.response.status,
            data: error.response.data,
          },
        }
      } else {
        return 'Error', error.message
      }
    })
  return response
}

const getLiveChannels = async (site_id, channel_id) => {
  const response = await axios({
    method: 'GET',
    url: `https://api.jwplayer.com/v2/sites/${site_id}/channels/${channel_id}/`,
    headers: {
      accept: 'application/json',
      Authorization: process.env.JWPLAYER_SECRET,
    },
  })
    .then((response) => {
      return response.data
    })
    .catch((error) => {
      if (error.response) {
        return {
          error: {
            status: error.response.status,
            data: error.response.data,
          },
        }
      } else {
        return 'Error', error.message
      }
    })
  return response
}

const createThumbnail = async (site_id, media_id, imageUrl) => {
  const response = await axios({
    method: 'POST',
    url: `https://api.jwplayer.com/v2/sites/${site_id}/thumbnails/`,
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      Authorization: process.env.JWPLAYER_SECRET,
    },
    data: {
      relationships: { media: [{ id: media_id }] },
      upload: {
        method: 'fetch',
        thumbnail_type: 'static',
        source_type: 'custom_upload',
        download_url: imageUrl,
      },
    },
  })
    .then((response) => {
      return response.data
    })
    .catch((error) => {
      if (error.response) {
        return {
          error: {
            status: error.response.status,
            data: error.response.data,
          },
        }
      } else {
        return 'Error', error.message
      }
    })
  return response
}

const enableThumbnail = async (site_id, thumbnail_id) => {
  const response = axios({
    method: 'post',
    url: `https://zcswehonfl.execute-api.us-west-2.amazonaws.com/prod/`,
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
    },
    data: { site_id: site_id, thumbnail_id: thumbnail_id },
  })
    .then((response) => {
      return response.data
    })
    .catch((error) => {
      if (error.response) {
        return {
          error: {
            status: error.response.status,
            data: error.response.data,
          },
        }
      } else {
        return 'Error', error.message
      }
    })
  return response
}

const convertTZ = (date, tzString) => {
  return new Date(
    (typeof date === 'string' ? new Date(date) : date).toLocaleString('en-US', {
      timeZone: tzString,
    })
  )
}

const dateCalc = () => {
  // sets as GMT in lambda
  const currentDate = new Date()
  // convert to Central Time
  const centralTime = convertTZ(currentDate, 'America/Chicago')
  let hours = centralTime.getUTCHours()
  let minutes = centralTime.getUTCMinutes()
  let day = centralTime.getUTCDay()
  if (minutes < 10) {
    minutes = minutes.toString().padStart(2, 0)
  }
  return {
    time: `${hours}${minutes}`,
    day: day,
  }
}

const isDateInRange = (time, startTime, endTime) => {
  return time > startTime && time < endTime
}

const getImage = (imageArr) => {
  let date = dateCalc()
  let time = date.time
  let day = date.day
  let imageUrl = ''

  const image = Object.keys(imageArr).forEach((event) => {
    if (time > imageArr[event].startTime && time < imageArr[event].endTime) {
      imageUrl = imageArr[event].imageUrl
    }
  })
  // set Saturday or Sunday News
  if (time > 650 && time < 710) {
    if (day === 6) {
      imageUrl = imageArr['firstNewsSaturday'].imageUrl
    } else {
      imageUrl = imageArr['firstNewsSunday'].imageUrl
    }
  }
  return imageUrl
}

export const handler = async (event) => {
  console.log(event)
  if (event === undefined) {
    return {
      status: 401,
      message: 'malformed event',
    }
  }
  if (event.channel_id !== 'oQI9YDnI') {
    return { message: 'not wday event' }
  }
  const channel = await getLiveChannels(event.site_id, event.channel_id)
  console.log('Channel')
  console.log(channel)
  if (channel.status !== 'active') {
    return { message: 'no active wday stream' }
  }
  // need to check for media_id and status = active
  const liveEvent = channel.recent_events[0]
  console.log('Live Event')
  console.log(liveEvent)
  if (liveEvent.status !== 'active') {
    return { message: 'no active wday event' }
  }
  // calculate date and get corresponding event
  const image = getImage(imageObj)
  const thumbnail = await createThumbnail(
    event.site_id,
    liveEvent.media_id,
    image
  )
  if (thumbnail?.error) {
    console.log('error uploading thumbnail')
    console.log(thumbnail.data)
    return { message: 'error uploading thumbnail, jwplayer api failure' }
  }
  const media = await getJwplayerMedia(event.site_id, liveEvent.media_id)
  if (media.metadata.custom_params?.thumbnail_id !== undefined) {
    console.log(media.metadata.custom_params)
    const request = await enableThumbnail(
      event.site_id,
      media.metadata.custom_params?.thumbnail_id
    )
    console.log(request)
    return { message: 'thumbnail id already present and uploaded' }
  }
  if (thumbnail !== undefined) {
    const custom_params = channel.metadata.custom_params
    custom_params.livestream_channel_id = channel.id
    custom_params.thumbnail_id = thumbnail.id
    const updateLiveEvent = await updateJwplayerMedia(
      event.site_id,
      liveEvent.media_id,
      custom_params
    )
    console.log('updated live event')
    console.log(updateLiveEvent)
  }
  console.log('create thumbnail')
  console.log(thumbnail)
  const request = await enableThumbnail(event.site_id, thumbnail.id)
  console.log('pinged enable ')
  console.log(request)
  return { message: 'successfully created thumbnail' }
}
