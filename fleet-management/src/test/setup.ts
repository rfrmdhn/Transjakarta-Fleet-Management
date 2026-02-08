import '@testing-library/jest-dom';
import { cleanup } from '@testing-library/react';
import { afterEach, vi } from 'vitest';

// Cleanup after each test case (e.g. clearing jsdom)
afterEach(() => {
    cleanup();
});

// Global IntersectionObserver Mock
class IntersectionObserverMock {
    readonly root: Element | null = null;
    readonly rootMargin: string = '';
    readonly thresholds: ReadonlyArray<number> = [];
    readonly callback: IntersectionObserverCallback;

    constructor(callback: IntersectionObserverCallback, options?: IntersectionObserverInit) {
        this.callback = callback;
        this.root = (options?.root as Element) || null;
        this.rootMargin = options?.rootMargin || '';
        this.thresholds = options?.threshold ? (Array.isArray(options.threshold) ? options.threshold : [options.threshold]) : [];
    }

    observe = vi.fn();
    unobserve = vi.fn();
    disconnect = vi.fn();
    takeRecords = () => [];
}

window.IntersectionObserver = IntersectionObserverMock as any;
