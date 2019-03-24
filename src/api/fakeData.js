export const fetchSearch = () => {
  fetch('https://randomuser.me/api/?nat=us&results=12&noinfo').then(res =>
    res.json()
  );
  // .then(res => {
  //   console.log(res);
  //   this.setState({
  //     fetchArr: res.results,
  //     hasLoaded: true
  //   });
  // });
};
