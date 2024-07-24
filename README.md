# jwplayer-create-thumbnail

## AWS Lambda and Gateway

[jwplayer-create-thumbnail lambda](https://us-west-2.console.aws.amazon.com/lambda/home?region=us-west-2#/functions/jwplayer-create-thumbnail?tab=code)

[jwplayer-create-thumbnail gateway](https://us-west-2.console.aws.amazon.com/apigateway/main/onboard?region=us-west-2&url=https%3A%2F%2Fus-west-2.console.aws.amazon.com%2Fapigateway%2Fhome%3Fregion%3Dus-west-2%23%2Fapis%2F2voxcus3i6%2Fresources%2Fqcr7p6d2cc%2Fmethods%2FPOST)

https://2voxcus3i6.execute-api.us-west-2.amazonaws.com/prod/

POST Request

```
{
    event: 'channel_active',
    channel_id: 'oQI9YDnI',
    webhook_id: 'joFoFHqr',
    site_id: 'l0XScfRd',
    event_time: '2024-07-22T21:59:24+00:00'
}
```

## Description

Creates thumbnail based on time for a given WDAY+ live event.

Accepts events from JW Player Webhook that fires when a channel goes live.

[Schedule of Events](https://fccdigital.atlassian.net/issues/MKT-867?jql=text%20~%20%22wday%20thumbnail%2A%22)

Thumbnails are created using the [JW Player Thumbnail API Endpoint](https://docs.jwplayer.com/platform/reference/post_v2-sites-site-id-thumbnails). After successful upload, the thumbnail id is stored within the live event's custom params using the [JW Player update media API Endpoint](https://docs.jwplayer.com/platform/reference/patch_v2-sites-site-id-media-media-id). The thumbnail id & site id are sent to the [jwplayer-update-thumbnail](https://github.com/openfcci/jwplayer-update-thumbnail) function to enable the thumbnail for the event.
