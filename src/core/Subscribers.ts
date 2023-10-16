import { Computed, isComputed } from "../reactive";

export class Subscribers {
  computed = new Set<Computed<any>>();
  consumers = new Set<Function>();

  add(sub: any) {
    if (isComputed(sub)) {
      this.computed.add(sub);
      return () => {
        this.computed.delete(sub);
      };
    }
    //
    else {
      this.consumers.add(sub);
      return () => {
        this.consumers.delete(sub);
      };
    }
  }
}
