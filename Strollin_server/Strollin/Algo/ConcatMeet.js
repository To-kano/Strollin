var algo = require('./BasicAlgoDemo');
var meet = require('./MeetUp');

const promise1 = meet.data.hello()

promise1.then((value) => {
  const promise2 = algo.data.hello()
  promise2.then((value2) => {
    for (i = 0; i < value2.length; i++) {
      if (value2[i].Name == value.Name) {
        value2.splice(i, 1);
        break;
      }
    }
    value2.push(value)
    console.log("---------------------------------------");
    console.log("\n\n");
    console.log("User1 Trip: ", value2);
    console.log("\n\n");
    console.log("---------------------------------------");
    const promise3 = algo.data.hello()
    promise3.then((value3) => {
      for (i = 0; i < value3.length; i++) {
        if (value3[i].Name == value.Name) {
          value3.splice(i, 1);
          break;
        }
      }
      value3.push(value)
      console.log("---------------------------------------");
      console.log("\n\n");
      console.log("User2 Trip: ", value3);
      console.log("\n\n");
      console.log("---------------------------------------");
    });
  });
});
