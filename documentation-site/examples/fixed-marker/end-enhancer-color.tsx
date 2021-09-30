import * as React from 'react';
import {FixedMarker} from 'baseui/map-marker';
// @ts-ignore
import DeleteAlt from 'baseui/icon/delete-alt';

export default function Example() {
  return (
    <FixedMarker
      label="Illegal Dropoff"
      endEnhancer={<DeleteAlt />}
      color="white"
      background="#E11900"
    />
  );
}
