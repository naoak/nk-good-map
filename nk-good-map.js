'use strict';

{
  let initCalled;
  const callbackPromise = new Promise((r) => window.__initGoodMap = r);

  function loadGoogleMaps(apiKey, language, region) {
    if (!initCalled) {
      const script = document.createElement('script');
      script.src = 'https://maps.googleapis.com/maps/api/js?' +
        (apiKey ? `key=${apiKey}&` : '') +
        (language ? `language=${language}&` : '') +
        (region ? `region=${region}&` : '') +
        'callback=__initGoodMap';
      document.head.appendChild(script);
      initCalled = true;
    }
    return callbackPromise;
  }

  function dashToCamelCase(dash) {
    return dash.indexOf('-') < 0 ? dash : dash.replace(/-[a-z]/g, (m) => m[1].toUpperCase());
  }

  customElements.define('nk-good-map', class extends HTMLElement {
    static get observedAttributes() {
      return ['api-key', 'language', 'region', 'zoom', 'latitude', 'longitude', 'map-options'];
    }

    attributeChangedCallback(name, oldVal, val) {
      name = dashToCamelCase(name);
      switch (name) {
        case 'apiKey':
        case 'language':
        case 'region':
          this[name] = val;
          break;
        case 'zoom':
        case 'latitude':
        case 'longitude':
          this[name] = parseFloat(val);
          break;
        case 'mapOptions':
          this[name] = JSON.parse(val);
          break
      }
    }

    constructor() {
      super();

      this.map = null;
      this.apiKey = null;
      this.language = null;
      this.region = null;
      this.zoom = null;
      this.latitude = null;
      this.longitude = null;
      this.mapOptions = {};
    }

    connectedCallback() {
      loadGoogleMaps(this.apiKey, this.language, this.region).then(() => {
        if (!this.mapOptions.zoom) {
          this.mapOptions.zoom = this.zoom || 0;
        }
        if (!this.mapOptions.center) {
          this.mapOptions.center = {
            lat: this.latitude || 0,
            lng: this.longitude || 0
          };
        }
        this.map = new google.maps.Map(this, this.mapOptions);
        this.dispatchEvent(new CustomEvent('google-map-ready', { detail: this.map }));
      });
    }
  });
}
