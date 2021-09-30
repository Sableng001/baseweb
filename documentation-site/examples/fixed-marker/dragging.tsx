import * as React from 'react';
import {
  FixedMarker,
  NEEDLE_SIZES,
  PINHEAD_SIZES,
} from 'baseui/map-marker';
// @ts-ignore
import Search from 'baseui/icon/search';

export default function Example() {
  const [dragging, setDragging] = React.useState(false);
  return (
    <div
      onMouseEnter={() => setDragging(true)}
      onMouseLeave={() => setDragging(false)}
    >
      <FixedMarker
        startEnhancer={<Search />}
        size={PINHEAD_SIZES.large}
        needle={NEEDLE_SIZES.short}
        label="Hover over me to view dragging state"
        dragging={dragging}
      />
    </div>
  );
}
