/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';
import { getOverrides, mergeOverrides } from '../helpers/overrides';
import {
  Root as StyledRoot,
  TabBar as StyledTabBar,
  TabContent as StyledTabContent,
} from './styled-components';
import type { TabsProps, SharedStylePropsArg } from './types';
import { ORIENTATION } from './constants';

export default class Tabs extends React.Component<TabsProps> {
  static defaultProps: Partial<TabsProps> = {
    disabled: false,
    onChange: () => {},
    overrides: {},
    orientation: ORIENTATION.horizontal,
    renderAll: false,
  };

  onChange({ activeKey }: { activeKey: string }) {
    const { onChange } = this.props;
    typeof onChange === 'function' && onChange({ activeKey });
  }

  getTabs() {
    const { activeKey, disabled, orientation, children, overrides = {} } = this.props;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const tabs = React.Children.map(children, (child: any, index) => {
      if (!child) return;

      const key = child.key || String(index);
      return React.cloneElement(child, {
        key,
        id: key, // for aria-labelledby
        active: key === activeKey,
        disabled: disabled || child.props.disabled,
        $orientation: orientation,
        onSelect: () => this.onChange({ activeKey: key }),
        children: child.props.title,
        overrides: mergeOverrides(overrides, child.props.overrides || {}),
      });
    });

    return tabs;
  }

  getPanels() {
    const { activeKey, disabled, orientation, children, overrides = {}, renderAll } = this.props;
    const { TabContent: TabContentOverride } = overrides;
    const [TabContent, tabContentProps] = getOverrides(TabContentOverride, StyledTabContent);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const tabs = React.Children.map(children, (child: any, index) => {
      if (!child) return;
      const key = child.key || String(index);
      const isActive = key === activeKey;
      const props = {
        key,
        'aria-labelledby': key,
      };
      const sharedProps = {
        $active: isActive,
        $disabled: disabled,
        $orientation: orientation,
      };

      return (
        // @ts-ignore TS2786 error with web-eats-v2, can remove once React 18 migration complete
        <TabContent role="tabpanel" {...sharedProps} {...tabContentProps} {...props}>
          {renderAll ? child.props.children : null}
          {isActive && !renderAll ? child.props.children : null}
        </TabContent>
      );
    });
    return tabs;
  }

  getSharedProps(): SharedStylePropsArg {
    const { disabled, orientation } = this.props;
    return {
      $disabled: disabled,
      $orientation: orientation,
    };
  }

  render() {
    const sharedProps = this.getSharedProps();
    const { overrides = {} } = this.props;
    const { Root: RootOverride, TabBar: TabBarOverride } = overrides;
    const [Root, rootProps] = getOverrides(RootOverride, StyledRoot);
    const [TabBar, tabBarProps] = getOverrides(TabBarOverride, StyledTabBar);

    return (
      // @ts-ignore TS2786 error with web-eats-v2, can remove once React 18 migration complete
      <Root data-baseweb="tabs" {...sharedProps} {...rootProps}>
        {/* @ts-ignore TS2786 error with web-eats-v2, can remove once React 18 migration complete */}
        <TabBar role="tablist" {...sharedProps} {...tabBarProps}>
          {this.getTabs()}
        </TabBar>
        {this.getPanels()}
      </Root>
    );
  }
}
