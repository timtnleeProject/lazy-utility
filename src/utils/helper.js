export class CancelablePromise {
  constructor (originPromise) {
    this.cancelled = false;
    this.promises = [];
    originPromise
      .then(val => (this.cancelled ? console.log('promise cancelled') : this.generateChains(Promise.resolve(val))))
      .catch(e => (this.cancelled ? console.log('promise cancelled') : this.generateChains(Promise.reject(e))));
  }

  generateChains (first) {
    return this.promises.reduce((chains, handler) => {
      return chains[handler.type](handler.fn);
    }, first);
  }

  then (fn) {
    this.promises.push({
      type: 'then',
      fn
    });
    return this;
  }

  catch (fn) {
    this.promises.push({
      type: 'catch',
      fn
    });
    return this;
  }

  finally (fn) {
    this.promises.push({
      type: 'finally',
      fn
    });
    return this;
  }

  cancel () {
    this.cancelled = true;
  }
}
