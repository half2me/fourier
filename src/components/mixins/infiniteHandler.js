export const infiniteHandler = {
  methods: {
    infiniteHandler(s) {
      this.pull().then((more) => {
        if (more) {
          s.loaded();
        } else {
          s.complete();
        }
      });
    },
  },
};
