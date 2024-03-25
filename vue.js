var vm = new Vue({
  el: '#main',
  data: {
    search: '',
    theUrl: '',
    theTitle: '',
    activeVideo: '',
    show: false,
    toggle: true,
    videos: [],
  },
  //añadir las pistas del objeto videos
  created() {
    if (this.videos.length != 0)
      this.videos = JSON.parse(localStorage.getItem("clues"));
  },
  methods: {
    showTitle: function () {
      if (this.theUrl != '')
        this.show = !this.show;
      setTimeout(function () { $('#ttl').focus(); }, 100);
    },

    addData: function () {
      if (this.theTitle != '')
        this.show = !this.show;
      var nuevaURL = this.theUrl.split("&");
      this.videos.push({ url: nuevaURL[0], title: this.theTitle, active: false });
      // Guardo el objeto como un string
      localStorage.setItem('clues', JSON.stringify(this.videos));
      this.theUrl = this.theTitle = '';
    },

    playVideo: function (video) {
      var theUrl = video.url;
      var newUrl = theUrl.replace('watch?v=', 'embed/');
      this.activeVideo = newUrl + '?&autoplay=1';
      for (i = 0; i < this.videos.length; i++) {
        this.videos[i].active = false;
      }
      video.active = true;
    },
    deleteVideo: function (video) {
      this.videos.splice(this.videos.indexOf(video), 1);
      localStorage.setItem('clues', JSON.stringify(this.videos));
    },
    addSearch: function () {
      this.toggle = !this.toggle
    },
    order: function () {
      this.videos.sort(function (a, b) {
        if (a.title > b.title)
          return 1;
        else if (a.title < b.title)
          return -1;
        return 0;
      });
    }
  },
  computed: {
    searchByTitle() {
      return this.videos.filter((search) => search.title.includes(this.search))
    },
  },
})


