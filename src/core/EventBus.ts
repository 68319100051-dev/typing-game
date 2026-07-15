type EventCallback = (...args: unknown[]) => void;

export class EventBus {
  private events: Map<string, EventCallback[]> = new Map();

  on(event: string, callback: EventCallback): () => void {
    if (!this.events.has(event)) {
      this.events.set(event, []);
    }
    this.events.get(event)!.push(callback);
    return () => this.off(event, callback);
  }

  off(event: string, callback: EventCallback): void {
    const callbacks = this.events.get(event);
    if (!callbacks) return;
    const index = callbacks.indexOf(callback);
    if (index > -1) callbacks.splice(index, 1);
  }

  emit(event: string, ...args: unknown[]): void {
    const callbacks = this.events.get(event);
    if (!callbacks) return;
    callbacks.forEach((cb) => cb(...args));
  }

  once(event: string, callback: EventCallback): void {
    const wrapper = (...args: unknown[]) => {
      this.off(event, wrapper);
      callback(...args);
    };
    this.on(event, wrapper);
  }

  clear(): void {
    this.events.clear();
  }
}

export const eventBus = new EventBus();