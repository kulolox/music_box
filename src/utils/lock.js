const locks = {};

function delay(timeout = 0) {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
}

async function lock(work, name = 'default') {
  while (locks[name]) {
    await delay(1);
  }
  locks[name] = true;
  return work();
  // try {
  //   return await work();
  // } catch (e) {
  //   throw e;
  // } finally {
  //   delete locks[name];
  // }
}

export default lock;
