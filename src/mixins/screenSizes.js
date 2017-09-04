export default {
  data() {
    return {
      screenSizesMixin: {
        screenSizes: {
          xs: 576,
          sm: 768,
          md: 992,
          lg: 1024,
          xl: 1280,
        },
        windowWidth: 0,
      },
      isLandscape: true,
    };
  },
  created() {
    window.addEventListener('resize', this.updateWindowWidth);
    this.updateWindowWidth();
  },
  computed: {
    isXS() {
      return this.screenSizesMixin.windowWidth <= this.screenSizesMixin.screenSizes.sm;
    },
    isSM() {
      return this.screenSizesMixin.windowWidth > this.screenSizesMixin.screenSizes.sm
        && this.screenSizesMixin.windowWidth <= this.screenSizesMixin.screenSizes.md;
    },
    isMD() {
      return this.screenSizesMixin.windowWidth > this.screenSizesMixin.screenSizes.md
        && this.screenSizesMixin.windowWidth <= this.screenSizesMixin.screenSizes.lg;
    },
    isLG() {
      return this.screenSizesMixin.windowWidth > this.screenSizesMixin.screenSizes.lg
        && this.screenSizesMixin.windowWidth <= this.screenSizesMixin.screenSizes.xl;
    },
    isXL() {
      return this.screenSizesMixin.windowWidth > this.screenSizesMixin.screenSizes.xl;
    },
  },
  methods: {
    updateWindowWidth() {
      this.screenSizesMixin.windowWidth = window.innerWidth;
      this.isLandscape = window.innerWidth > window.innerHeight;
    },
  },
};
