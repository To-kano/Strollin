import React from 'react';
import {shallow, mount} from 'enzyme';
import HistoryElement from '../Components/HistoryElement';
import renderer from 'react-test-renderer';


const historyNavTest = {
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


describe('HistoryElement', () => {
    describe('Rendering', () => {
        it('should match to snapshot', () => {
            const component = shallow(<HistoryElement data={historyNavTest.waypoints}/>)
            expect(component).toMatchSnapshot()
        });


        test('test render HistoryElement-test', () => {
            renderer.create(
                <HistoryElement data={historyNavTest.waypoints} />,
            )      
          })

          test('test moount HistoryElement-test', () => {
            const wrapper =  shallow(
                <HistoryElement data={historyNavTest.waypoints} />,
            )      
          })

          it('handles change to map', () => {
            const wrapper =  shallow(<HistoryElement data={historyNavTest.waypoints}/>);
        
            expect(wrapper.find({ id: 'button map' }).length).toBe(1);

            wrapper
              .find({ id: 'button map' })
              .first()
              .props()
              .onPress()
        
            });

            it('handles share button 1', () => {
                const wrapper =  shallow(<HistoryElement data={historyNavTest.waypoints}/>);
            
                expect(wrapper.find({ id: 'button share 1' }).length).toBe(1);
    
                wrapper
                  .find({ id: 'button share 1' })
                  .first()
                  .props()
                  .onPress()
            
                });

            it('handles share button 2', () => {
                const wrapper =  shallow(<HistoryElement data={historyNavTest.waypoints}/>);
            
                expect(wrapper.find({ id: 'button share 2' }).length).toBe(1);
    
                wrapper
                  .find({ id: 'button share 2' })
                  .first()
                  .props()
                  .onPress()
            
                });

                it('handles change to map 2', () => {
                    const wrapper =  shallow(<HistoryElement data={historyNavTest.waypoints} defaultSate={true} />);
                
                    expect(wrapper.find({ id: 'button map' }).length).toBe(1);
        
                    wrapper
                      .find({ id: 'button map' })
                      .first()
                      .props()
                      .onPress()
                
                    });

                    it('handles share button 3', () => {
                        const wrapper =  shallow(<HistoryElement data={historyNavTest.waypoints} defaultSate={true} />);
                    
                        expect(wrapper.find({ id: 'button share 1' }).length).toBe(1);
            
                        wrapper
                          .find({ id: 'button share 1' })
                          .first()
                          .props()
                          .onPress()
                    
                        });
        
                    it('handles share button 4', () => {
                        const wrapper =  shallow(<HistoryElement data={historyNavTest.waypoints} defaultSate={true} />);
                    
                        expect(wrapper.find({ id: 'button share 2' }).length).toBe(1);
            
                        wrapper
                          .find({ id: 'button share 2' })
                          .first()
                          .props()
                          .onPress()
                    
                        });

        
    });
});