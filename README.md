# nk-good-map

`<nk-good-map>` is a simple custom element wrapper for [Google Maps JavaScript API](https://developers.google.com/maps/documentation/javascript/).

## Installation

Include [nk-good-map.js](nk-good-map.js) somewhere on your page (`async`/`defer` are optional):

```html
<script src="nk-good-map.js" async defer></script>
```

Alternatively, use an HTML import to include [nk-good-map.html](nk-good-map.html):

```html
<link rel="import" href="nk-good-map.html">
```

## Usage

Create a `<nk-good-map>` element anywhere on your page. Be sure to style the element with `display: block` and give it a height. You can also specify `zoom`, `latitude`, `longitude`, and `map-options` attributes:

<!--
```
<custom-element-demo>
  <template>
    <script src="nk-good-map.js" async defer></script>
    <next-code-block></next-code-block>
  </template>
</custom-element-demo>
```
-->
```html
<style>
nk-good-map {
  display: block;
  height: 400px;
}
</style>

<nk-good-map api-key="AIzaSyAQuo91bcoB-KwWXaANroTrzpNZRFcNJ1k"
    latitude="30"
    longitude="-100" zoom="2"
    map-options='{"mapTypeId": "satellite"}'></nk-good-map>
```

Attributes on `<nk-good-map>` are used for map initialization only and are not updated when the user interacts with the map. For interactive functionality, listen for the `google-map-ready` event and use `goodMap.map` or `event.detail` to access the underlying instance of [`google.maps.Map`](https://developers.google.com/maps/documentation/javascript/3.exp/reference#Map).
