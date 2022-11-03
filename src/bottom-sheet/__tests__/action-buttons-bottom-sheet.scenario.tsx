/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';
import { styled } from '../../styles';

import { BottomSheet } from '../bottom-sheet';
import Filter from '../../icon/filter';
import Search from '../../icon/search';
import map from './map-san-francisco.jpg';

const StyledIphone6 = styled('div', {
  width: '375px',
  height: '667px',
  border: '1px solid #ECECEC',
  borderRadius: '12px',
});

export function Scenario() {
  return (
    <div style={{ display: 'flex', gap: '20px' }}>
      <StyledIphone6>
        <BottomSheet
          title="Title"
          description="Description"
          trailingAction={{
            renderIcon: ({ size }) => <Filter size={size} />,
            onClick: () => console.log('click filter'),
            label: 'filter',
          }}
          content={
            <div style={{ padding: '0px 12px' }}>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>
            </div>
          }
        >
          <div
            style={{
              overflow: 'auto',
              // position: 'absolute',
              // height: '100%',
              // width: '100%',
            }}
          >
            <img src={map} alt="map of San Francisco" />
          </div>
        </BottomSheet>
      </StyledIphone6>

      <StyledIphone6>
        <BottomSheet
          title="Title"
          description="Description"
          leadingAction={{
            renderIcon: ({ size }) => <Search size={size} />,
            onClick: () => console.log('click search'),
            label: 'search',
          }}
          trailingAction={{
            renderIcon: ({ size }) => <Filter size={size} />,
            onClick: () => console.log('click filter'),
            label: 'filter',
          }}
          content={
            <div style={{ padding: '0px 12px' }}>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>
            </div>
          }
        >
          <div
            style={{
              overflow: 'auto',
              // position: 'absolute',
              // height: '100%',
              // width: '100%',
            }}
          >
            <img src={map} alt="map of San Francisco" />
          </div>
        </BottomSheet>
      </StyledIphone6>
    </div>
  );
}
