import React from 'react';
import {shallow} from 'enzyme';
import HistoryNav from '../Components/HistoryNav';

const historyNavTest1 = {
    id: "1",
    date: '10/10/2020',
    duration: '2 heures',
    waypoints: [
        {
          id: '1',
          latitude: 48.798683,
          longitude: 2.446183,
          address: '6 Rue Thomas Edison, 94000 Créteil',
          name: 'Centre Sportif Marie-Thérèse Eyquem',
        },
        {
          id: '2',
          latitude: 48.780627,
          longitude: 2.457364,
          address: 'Centre commercial Créteil Soleil, 101 Avenue du Général de Gaulle, 94012 Créteil',
          name: 'Restaurant Flunch Creteil Soleil',
        }, {
          id: '3',
          latitude: 48.790379,
          longitude: 2.465619,
          address: '75 Avenue Pierre Brossolette, 94000 Creteil village',
          name: 'Le Foz Club discothèque',
        }
      ]
  };

  const historyNavTest2 = {
    id: "2",
    date: '11/11/2020',
    duration: '3 heures',
    waypoints: [
        {
          id: '1',
          latitude: 48.798683,
          longitude: 2.446183,
          address: '6 Rue Thomas Edison, 94000 Créteil',
          name: 'Centre Sportif Marie-Thérèse Eyquem',
        },
        {
          id: '2',
          latitude: 48.780627,
          longitude: 2.457364,
          address: 'Centre commercial Créteil Soleil, 101 Avenue du Général de Gaulle, 94012 Créteil',
          name: 'Restaurant Flunch Creteil Soleil',
        }, {
          id: '3',
          latitude: 48.790379,
          longitude: 2.465619,
          address: '75 Avenue Pierre Brossolette, 94000 Creteil village',
          name: 'Le Foz Club discothèque',
        }
      ]
  };

const mapTest = {
    historic: [historyNavTest1, historyNavTest2]
}

const navigationTest = {
    navigate: (test) => jest.fn()
}

describe('HistoryNav', () => {
    describe('Rendering', () => {
        it('should match to snapshot', () => {
            const component = shallow(<HistoryNav map={mapTest} navigation={navigationTest} />)
            expect(component).toMatchSnapshot()
        });
    });
});