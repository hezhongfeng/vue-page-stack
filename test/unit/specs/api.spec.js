import Router from 'vue-router';
import Vue from 'vue';
import { shallowMount, createLocalVue } from '@vue/test-utils'
const Home = { template: '<div>This is Home</div>' };
const Foo = { template: '<div>This is Foo</div>' };

describe('vue-page-stack push/back', () => {
  test('is delicious', () => {
    expect(myBeverage.delicious).toBeTruthy();
  });

  test('is not sour', () => {
    expect(myBeverage.sour).toBeFalsy();
  });
});
