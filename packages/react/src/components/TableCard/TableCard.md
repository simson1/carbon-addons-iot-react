# `TableCard` component

## Table of Contents

- [Getting started](#getting-started)
- [Thresholds](#thresholds)
- [Passing variables](#passing-variables)
- [Props](#props)
- [External links](#external-links)
  - [Source Code](#source-code)
  - [Feedback](#feedback)

## Getting Started

The `TableCard` component wraps the `Table` component with a card interface for use in dashboards.

```jsx
import { TableCard } from 'carbon-addons-iot-react';
```

## Thresholds

Thresholds can be based off 1 specific data source with the unique key: dataSourceId.

Comparisons can then be added by defined the comparison key with one of the following: <,<=,=,>,>= .

Severity has 3 possible settings, 1 (high), 2 (medium), 3 (low).

Value is the number limit being compared in the comparison that was defined.

Label is a custom label that can be defined and displayed in the column. If a custom label is not set,
the label will default to '<dataSourceId> Severity'

In addition, if the dataSourceId does not have a column displayed, a new column will be added at the end
of the table.

```jsx
const thresholds = [
  // this threshold is applied to the whole row, not a particular attribute
  {
    dataSourceId: 'count',
    comparison: '<',
    value: 5,
    severity: 3, // High threshold, medium, or low used for sorting and defined filtration
    label: text('Custom Count Severity Header', ''),
    showSeverityLabel: boolean('Show Count Threshold Labels', true),
    severityLabel: text('Custom Count Low Label', ''),
  },
  {
    dataSourceId: 'count',
    comparison: '>=',
    value: 10,
    severity: 1, // High threshold, medium, or low used for sorting and defined filtration
    showSeverityLabel: boolean('Show Count Threshold Labels', true),
    severityLabel: text('Custom Count Critical Label', 'Custom Critical'),
  },
  {
    dataSourceId: 'count',
    comparison: '=',
    value: 7,
    severity: 2, // High threshold, medium, or low used for sorting and defined filtration
    showSeverityLabel: boolean('Show Count Threshold Labels', true),
    severityLabel: text('Custom Count Moderate Label', ''),
  },
  {
    dataSourceId: 'pressure',
    comparison: '>=',
    value: 10,
    severity: 1,
    label: text('Custom Pressure Severity Header', 'Custom Pressure Severity Header'),
    showSeverityLabel: boolean('Show Pressure Threshold Label', true),
    severityLabel: text('Custom Pressure Critical Label', ''),
  },
];

return (
  <div style={{ width: `${getCardMinSize(breakpoint, size).x}px`, margin: 20 }}>
    <TableCard
      title={text('title', 'Open Alerts')}
      id="table-list"
      tooltip={text('Tooltip text', "Here's a Tooltip")}
      content={{
        columns: tableColumns,
        thresholds,
      }}
      values={boolean('no data', false) ? [] : tableData}
      onCardAction={(id, type, payload) => action('onCardAction', id, type, payload)}
      size={size}
      isLoading={boolean('isLoading', false)}
    />
  </div>
);
```

## Passing Variables

To pass a variable into your card, identify a variable to be used by wrapping it in curly brackets.
Make sure you have added a prop called 'cardVariables' to your card that is an object with key value pairs such that the key is the variable name and the value is the value to replace it with.
Optionally you may use a callback as the cardVariables value that will be given the variable and the card as arguments.
Note: if using row-specific variables in a TableCard href (ie a variable that has a different value per row),
do NOT pass the cardVariables prop and be sure that your table has reference to the proper value in another column

```jsx
<div
  style={{
    width: `${getCardMinSize(breakpoint, size).x}px`,
    margin: spacing05 + 4,
  }}
>
  <TableCard
    title="Open Alerts"
    id="table-list"
    tooltip="Here's a Tooltip"
    content={{
      columns: tableColumns,
      expandedRows: [
        {
          id: 'long_description',
          label: 'Description',
          linkTemplate: {
            href: text('href', 'http://ibm.com/{pressure}'),
          },
        },
        {
          id: 'other_description',
          label: 'Other content to show',
        },
        {
          id: 'hour',
          label: 'Time',
          type: 'TIMESTAMP',
        },
      ],
    }}
    values={boolean('no data', false) ? [] : tableData}
    onCardAction={(id, type, payload) => action('onCardAction', id, type, payload)}
    size={size}
    isLoading={boolean('isLoading', false)}
  />
</div>
```

## Props

| Name                                           | Type                                                                                                                                                                     | Default                                                                   | Description                                                                                                                                        |
| :--------------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------ | :------------------------------------------------------------------------------------------------------------------------------------------------- |
| id                                             | string                                                                                                                                                                   |                                                                           |                                                                                                                                                    |
| layout                                         | enum: <br/>'VERTICAL'<br/>'HORIZONTAL'<br/>                                                                                                                              |                                                                           |                                                                                                                                                    |
| title                                          | string                                                                                                                                                                   | undefined                                                                 |                                                                                                                                                    |
| toolbar                                        | element                                                                                                                                                                  | undefined                                                                 |                                                                                                                                                    |
| hideHeader                                     | bool                                                                                                                                                                     | false                                                                     |                                                                                                                                                    |
| timeRange                                      | string                                                                                                                                                                   | undefined                                                                 |                                                                                                                                                    |
| isLoading                                      | bool                                                                                                                                                                     | false                                                                     |                                                                                                                                                    |
| isEmpty                                        | bool                                                                                                                                                                     | false                                                                     |                                                                                                                                                    |
| isEditable                                     | bool                                                                                                                                                                     | false                                                                     |                                                                                                                                                    |
| isExpanded                                     | bool                                                                                                                                                                     | false                                                                     |                                                                                                                                                    |
| isLazyLoading                                  | bool                                                                                                                                                                     | false                                                                     |                                                                                                                                                    |
| availableActions                               | shape                                                                                                                                                                    | { edit: false, clone: false, delete: false, range: false, expand: false,} |                                                                                                                                                    |
| availableActions.edit                          | bool                                                                                                                                                                     |                                                                           |                                                                                                                                                    |
| availableActions.clone                         | bool                                                                                                                                                                     |                                                                           |                                                                                                                                                    |
| availableActions.delete                        | bool                                                                                                                                                                     |                                                                           |                                                                                                                                                    |
| availableActions.expand                        | bool                                                                                                                                                                     |                                                                           |                                                                                                                                                    |
| availableActions.range                         | bool                                                                                                                                                                     |                                                                           |                                                                                                                                                    |
| renderExpandIcon                               | function, node                                                                                                                                                           | undefined                                                                 |                                                                                                                                                    |
| rowHeight                                      | shape                                                                                                                                                                    |                                                                           | Row height in pixels for each layout                                                                                                               |
| rowHeight.lg                                   | number                                                                                                                                                                   |                                                                           |                                                                                                                                                    |
| rowHeight.md                                   | number                                                                                                                                                                   |                                                                           |                                                                                                                                                    |
| rowHeight.sm                                   | number                                                                                                                                                                   |                                                                           |                                                                                                                                                    |
| rowHeight.xs                                   | number                                                                                                                                                                   |                                                                           |                                                                                                                                                    |
| breakpoint                                     | enum: <br>'lg'<br>'max'<br>'md'<br>'sm'<br>'xl'<br>'xs'<br>                                                                                                              |                                                                           |                                                                                                                                                    |
| dashboardBreakpoints                           | shape                                                                                                                                                                    |                                                                           | media query pixel measurement that determines which particular dashboard layout should be used                                                     |
| dashboardBreakpoints.lg                        | number                                                                                                                                                                   |                                                                           |                                                                                                                                                    |
| dashboardBreakpoints.md                        | number                                                                                                                                                                   |                                                                           |                                                                                                                                                    |
| dashboardBreakpoints.sm                        | number                                                                                                                                                                   |                                                                           |                                                                                                                                                    |
| dashboardBreakpoints.xs                        | number                                                                                                                                                                   |                                                                           |                                                                                                                                                    |
| dashboardColumns                               | shape                                                                                                                                                                    |                                                                           | map of number of columns to a given dashboard layout                                                                                               |
| dashboardColumns.lg                            | number                                                                                                                                                                   |                                                                           |                                                                                                                                                    |
| dashboardColumns.md                            | number                                                                                                                                                                   |                                                                           |                                                                                                                                                    |
| dashboardColumns.sm                            | number                                                                                                                                                                   |                                                                           |                                                                                                                                                    |
| dashboardColumns.xs                            | number                                                                                                                                                                   |                                                                           |                                                                                                                                                    |
| cardDimensions                                 | shape [see cardDimensions prop](#carddimensions-prop)                                                                                                                    |                                                                           | array of configurable sizes to dimensions. The numbered sizes represent the number of columns and rows the card spans at that size and breakpoint. |
| i18n                                           | shape                                                                                                                                                                    |                                                                           |                                                                                                                                                    |
| i18n.noDataLabel                               | string                                                                                                                                                                   | 'No data is available for this time range.'                               |                                                                                                                                                    |
| i18n.noDataShortLabel                          | string                                                                                                                                                                   | 'No data'                                                                 |                                                                                                                                                    |
| i18n.errorLoadingDataLabel                     | string                                                                                                                                                                   | 'Error loading data for this card: '                                      |                                                                                                                                                    |
| i18n.errorLoadingDataShortLabel                | string                                                                                                                                                                   | 'Data error.'                                                             |                                                                                                                                                    |
| i18n.rollingPeriodLabel                        | string                                                                                                                                                                   | 'Rolling period'                                                          |                                                                                                                                                    |
| i18n.last24HoursLabel                          | string                                                                                                                                                                   | 'Last 24 hrs'                                                             |                                                                                                                                                    |
| i18n.last7DaysLabel                            | string                                                                                                                                                                   | 'Last 7 days'                                                             |                                                                                                                                                    |
| i18n.lastMonthLabel                            | string                                                                                                                                                                   | 'Last month'                                                              |                                                                                                                                                    |
| i18n.lastQuarterLabel                          | string                                                                                                                                                                   | 'Last quarter'                                                            |                                                                                                                                                    |
| i18n.periodToDateLabel                         | string                                                                                                                                                                   | 'Period to date'                                                          |                                                                                                                                                    |
| i18n.thisWeekLabel                             | string                                                                                                                                                                   | 'This week'                                                               |                                                                                                                                                    |
| i18n.thisMonthLabel                            | string                                                                                                                                                                   | 'This month'                                                              |                                                                                                                                                    |
| i18n.thisQuarterLabel                          | string                                                                                                                                                                   | 'This quarter'                                                            |                                                                                                                                                    |
| i18n.thisYearLabel                             | string                                                                                                                                                                   | 'This year'                                                               |                                                                                                                                                    |
| i18n.hourlyLabel                               | string                                                                                                                                                                   | 'Hourly'                                                                  |                                                                                                                                                    |
| i18n.dailyLabel                                | string                                                                                                                                                                   | 'Daily'                                                                   |                                                                                                                                                    |
| i18n.weeklyLabel                               | string                                                                                                                                                                   | 'Weekly'                                                                  |                                                                                                                                                    |
| i18n.monthlyLabel                              | string                                                                                                                                                                   | 'Monthly'                                                                 |                                                                                                                                                    |
| i18n.defaultLabel                              | node                                                                                                                                                                     | 'Default'                                                                 |                                                                                                                                                    |
| i18n.selectTimeRangeLabel                      | string                                                                                                                                                                   | 'Select time range'                                                       |                                                                                                                                                    |
| i18n.editCardLabel                             | string                                                                                                                                                                   | 'Edit card'                                                               |                                                                                                                                                    |
| i18n.cloneCardLabel                            | string                                                                                                                                                                   | 'Clone card'                                                              |                                                                                                                                                    |
| i18n.deleteCardLabel                           | string                                                                                                                                                                   | 'Delete card'                                                             |                                                                                                                                                    |
| i18n.expandLabel                               | string                                                                                                                                                                   | 'Expand to fullscreen'                                                    |                                                                                                                                                    |
| i18n.closeLabel                                | string                                                                                                                                                                   | 'Close'                                                                   |                                                                                                                                                    |
| i18n.loadingDataLabel                          | string                                                                                                                                                                   |                                                                           |                                                                                                                                                    |
| i18n.overflowMenuDescription                   | string                                                                                                                                                                   | 'Open and close list of options'                                          |                                                                                                                                                    |
| i18n.criticalLabel                             | string                                                                                                                                                                   | 'Critical'                                                                |                                                                                                                                                    |
| i18n.moderateLabel                             | string                                                                                                                                                                   | 'Moderate'                                                                |                                                                                                                                                    |
| i18n.lowLabel                                  | string                                                                                                                                                                   | 'Low'                                                                     |                                                                                                                                                    |
| i18n.selectSeverityPlaceholder                 | string                                                                                                                                                                   | 'Select a severity'                                                       |                                                                                                                                                    |
| i18n.searchPlaceholder                         | string                                                                                                                                                                   | 'Search'                                                                  |                                                                                                                                                    |
| i18n.filterButtonAria                          | string                                                                                                                                                                   | 'Filters'                                                                 |                                                                                                                                                    |
| i18n.defaultFilterStringPlaceholdText          | string                                                                                                                                                                   | 'Type and hit enter to apply'                                             |                                                                                                                                                    |
| i18n.downloadIconDescription                   | string                                                                                                                                                                   | 'Download table content'                                                  |                                                                                                                                                    |
| onMouseDown                                    | function                                                                                                                                                                 | undefined                                                                 |                                                                                                                                                    |
| onMouseUp                                      | function                                                                                                                                                                 | undefined                                                                 |                                                                                                                                                    |
| onTouchEnd                                     | function                                                                                                                                                                 | undefined                                                                 |                                                                                                                                                    |
| onTouchStart                                   | function                                                                                                                                                                 | undefined                                                                 |                                                                                                                                                    |
| onScroll                                       | function                                                                                                                                                                 | undefined                                                                 |                                                                                                                                                    |
| onFocus                                        | function                                                                                                                                                                 | undefined                                                                 |                                                                                                                                                    |
| onBlur                                         | function                                                                                                                                                                 | undefined                                                                 |                                                                                                                                                    |
| tabIndex                                       | number                                                                                                                                                                   | undefined                                                                 |                                                                                                                                                    |
| testID                                         | string                                                                                                                                                                   | CardWrapper.defaultProps.testID                                           |                                                                                                                                                    |
| tooltip                                        | node                                                                                                                                                                     |                                                                           |                                                                                                                                                    |
| title                                          | string                                                                                                                                                                   |                                                                           |                                                                                                                                                    |
| size                                           | enum:<br>&nbsp;CARD_SIZES.LARGE<br>&nbsp;CARD_SIZES.LARGEWIDE<br>                                                                                                        | CARD_SIZES.LARGE                                                          |                                                                                                                                                    |
| <span style="color: #31a148">content \*</span> | shape                                                                                                                                                                    |                                                                           |                                                                                                                                                    |
| content.columns                                | arrayOf(object)                                                                                                                                                          |                                                                           |                                                                                                                                                    |
| content.columns[].dataSourceId                 | string                                                                                                                                                                   |                                                                           |                                                                                                                                                    |
| content.columns[].width                        | number                                                                                                                                                                   |                                                                           |                                                                                                                                                    |
| content.columns[].label                        | string                                                                                                                                                                   |                                                                           |                                                                                                                                                    |
| content.columns[].priority                     | number                                                                                                                                                                   |                                                                           |                                                                                                                                                    |
| content.columns[].renderDataFunction           | function                                                                                                                                                                 |                                                                           |                                                                                                                                                    |
| content.columns[].type                         | string                                                                                                                                                                   |                                                                           |                                                                                                                                                    |
| content.columns[].linkTemplate                 | shape                                                                                                                                                                    |                                                                           |                                                                                                                                                    |
| content.columns[].linkTemplate.href            | string                                                                                                                                                                   |                                                                           |                                                                                                                                                    |
| content.columns[].linkTemplate.target          | string                                                                                                                                                                   |                                                                           |                                                                                                                                                    |
| content.showHeader                             | bool                                                                                                                                                                     |                                                                           |                                                                                                                                                    |
| content.expandedRows                           | arrayOf(object)                                                                                                                                                          |                                                                           |                                                                                                                                                    |
| content.expandedRows[].id                      | string                                                                                                                                                                   |                                                                           |                                                                                                                                                    |
| content.expandedRows[].label                   | string                                                                                                                                                                   |                                                                           |                                                                                                                                                    |
| content.expandedRows[].linkTemplate            | shape                                                                                                                                                                    |                                                                           |                                                                                                                                                    |
| content.expandedRows[].linkTemplate.href       | string                                                                                                                                                                   |                                                                           |                                                                                                                                                    |
| content.expandedRows[].linkTemplate.target     | string                                                                                                                                                                   |                                                                           |                                                                                                                                                    |
| content.expandedRows[].type                    | string                                                                                                                                                                   |                                                                           |                                                                                                                                                    |
| content.thresholds                             | arrayOf(object)                                                                                                                                                          |                                                                           |                                                                                                                                                    |
| content.thresholds[].dataSourceId              | string                                                                                                                                                                   |                                                                           |                                                                                                                                                    |
| content.thresholds[].comparison                | enum: <br/>'>'<br/>'<'<br/>'='<br/>'<='<br/>'>='                                                                                                                         |                                                                           |                                                                                                                                                    |
| content.thresholds[].value                     | string, number                                                                                                                                                           |                                                                           |                                                                                                                                                    |
| content.thresholds[].severity                  | enum: <br/>1<br/>2<br/>3                                                                                                                                                 |                                                                           |                                                                                                                                                    |
| content.thresholds[].color                     | string                                                                                                                                                                   |                                                                           | optional overrides for color and icon                                                                                                              |
| content.thresholds[].icon                      | string                                                                                                                                                                   |                                                                           | Custom threshold icon name                                                                                                                         |
| content.thresholds[].label                     | string                                                                                                                                                                   |                                                                           | Custom threshold label text                                                                                                                        |
| content.thresholds[].showSeverityLabel         | bool                                                                                                                                                                     |                                                                           | Optionally shows threshold severity label text. Shows by default                                                                                   |
| content.thresholds[].severityLabel             | string                                                                                                                                                                   |                                                                           | Optionally changes threshold severity label text                                                                                                   |
| content.thresholds[].showOnContent             | bool                                                                                                                                                                     |                                                                           | Shows column when there is no data                                                                                                                 |
| content.sort                                   | enum: <br/>'ASC'<br/>'DESC'                                                                                                                                              |                                                                           |                                                                                                                                                    |
| content.emptyMessage                           | node                                                                                                                                                                     |                                                                           |                                                                                                                                                    |
| value                                          | arrayOf(object)                                                                                                                                                          |                                                                           |                                                                                                                                                    |
| value[].id                                     | string                                                                                                                                                                   |                                                                           |                                                                                                                                                    |
| value[].values                                 | object                                                                                                                                                                   |                                                                           |                                                                                                                                                    |
| value[].actions                                | arrayOf(object)                                                                                                                                                          |                                                                           |                                                                                                                                                    |
| value[].actions[].id                           | string                                                                                                                                                                   |                                                                           |                                                                                                                                                    |
| value[].actions[].label                        | string                                                                                                                                                                   |                                                                           |                                                                                                                                                    |
| value[].actions[].icon                         | enum: <br/>'caretUp'<br/>'caretDown' <br/>'edit' <br/>'close' <br/>'checkmark' <br/>'warning' <br/>'arrowUp' <br/>'arrowDown' <br/>'user' <br/>'info' <br/>'help'\|shape |                                                                           |                                                                                                                                                    |
| value[].actions[].icon.width                   | string                                                                                                                                                                   |                                                                           |                                                                                                                                                    |
| value[].actions[].icon.height                  | string                                                                                                                                                                   |                                                                           |                                                                                                                                                    |
| value[].actions[].icon.viewBox                 | string                                                                                                                                                                   |                                                                           |                                                                                                                                                    |
| value[].actions[].svgData                      | object                                                                                                                                                                   |                                                                           |                                                                                                                                                    |
| cardVariables                                  | objectOf({\[string\]: string,function,number,bool})                                                                                                                      |                                                                           |                                                                                                                                                    |
| locale                                         | string                                                                                                                                                                   | 'en'                                                                      |                                                                                                                                                    |

### cardDimensions Prop

| Name                       | Type   | Default | Description |
| :------------------------- | :----- | :------ | :---------- |
| cardDimensions.XSMALL      | shape  |         |             |
| cardDimensions.XSMALL.lg   | shape  |         |             |
| cardDimensions.XSMALL.lg.w | number |         |             |
| cardDimensions.XSMALL.lg.h | number |         |             |
| cardDimensions.XSMALL.md   | shape  |         |             |
| cardDimensions.XSMALL.md.w | number |         |             |
| cardDimensions.XSMALL.md.h | number |         |             |
| cardDimensions.XSMALL.sm   | shape  |         |             |
| cardDimensions.XSMALL.sm.w | number |         |             |
| cardDimensions.XSMALL.sm.h | number |         |             |
| cardDimensions.XSMALL.xs   | shape  |         |             |
| cardDimensions.XSMALL.xs.w | number |         |             |
| cardDimensions.XSMALL.xs.h | number |         |             |
| cardDimensions.SMALL       | shape  |         |             |
| cardDimensions.SMALL.lg    | shape  |         |             |
| cardDimensions.SMALL.lg.w  | number |         |             |
| cardDimensions.SMALL.lg.h  | number |         |             |
| cardDimensions.SMALL.md    | shape  |         |             |
| cardDimensions.SMALL.md.w  | number |         |             |
| cardDimensions.SMALL.md.h  | number |         |             |
| cardDimensions.SMALL.sm    | shape  |         |             |
| cardDimensions.SMALL.sm.w  | number |         |             |
| cardDimensions.SMALL.sm.h  | number |         |             |
| cardDimensions.SMALL.xs    | shape  |         |             |
| cardDimensions.SMALL.xs.w  | number |         |             |
| cardDimensions.SMALL.xs.h  | number |         |             |
| cardDimensions.TALL        | shape  |         |             |
| cardDimensions.TALL.lg     | shape  |         |             |
| cardDimensions.TALL.lg.w   | number |         |             |
| cardDimensions.TALL.lg.h   | number |         |             |
| cardDimensions.TALL.md     | shape  |         |             |
| cardDimensions.TALL.md.w   | number |         |             |
| cardDimensions.TALL.md.h   | number |         |             |
| cardDimensions.TALL.sm     | shape  |         |             |
| cardDimensions.TALL.sm.w   | number |         |             |
| cardDimensions.TALL.sm.h   | number |         |             |
| cardDimensions.TALL.xs     | shape  |         |             |
| cardDimensions.TALL.xs.w   | number |         |             |
| cardDimensions.TALL.xs.h   | number |         |             |
| cardDimensions.MEDIUM      | shape  |         |             |
| cardDimensions.MEDIUM.lg   | shape  |         |             |
| cardDimensions.MEDIUM.lg.w | number |         |             |
| cardDimensions.MEDIUM.lg.h | number |         |             |
| cardDimensions.MEDIUM.md   | shape  |         |             |
| cardDimensions.MEDIUM.md.w | number |         |             |
| cardDimensions.MEDIUM.md.h | number |         |             |
| cardDimensions.MEDIUM.sm   | shape  |         |             |
| cardDimensions.MEDIUM.sm.w | number |         |             |
| cardDimensions.MEDIUM.sm.h | number |         |             |
| cardDimensions.MEDIUM.xs   | shape  |         |             |
| cardDimensions.MEDIUM.xs.w | number |         |             |
| cardDimensions.MEDIUM.xs.h | number |         |             |
| cardDimensions.WIDE        | shape  |         |             |
| cardDimensions.WIDE.lg     | shape  |         |             |
| cardDimensions.WIDE.lg.w   | number |         |             |
| cardDimensions.WIDE.lg.h   | number |         |             |
| cardDimensions.WIDE.md     | shape  |         |             |
| cardDimensions.WIDE.md.w   | number |         |             |
| cardDimensions.WIDE.md.h   | number |         |             |
| cardDimensions.WIDE.sm     | shape  |         |             |
| cardDimensions.WIDE.sm.w   | number |         |             |
| cardDimensions.WIDE.sm.h   | number |         |             |
| cardDimensions.WIDE.xs     | shape  |         |             |
| cardDimensions.WIDE.xs.w   | number |         |             |
| cardDimensions.WIDE.xs.h   | number |         |             |
| cardDimensions.LARGE       | shape  |         |             |
| cardDimensions.LARGE.lg    | shape  |         |             |
| cardDimensions.LARGE.lg.w  | number |         |             |
| cardDimensions.LARGE.lg.h  | number |         |             |
| cardDimensions.LARGE.md    | shape  |         |             |
| cardDimensions.LARGE.md.w  | number |         |             |
| cardDimensions.LARGE.md.h  | number |         |             |
| cardDimensions.LARGE.sm    | shape  |         |             |
| cardDimensions.LARGE.sm.w  | number |         |             |
| cardDimensions.LARGE.sm.h  | number |         |             |
| cardDimensions.LARGE.xs    | shape  |         |             |
| cardDimensions.LARGE.xs.w  | number |         |             |
| cardDimensions.LARGE.xs.h  | number |         |             |
| cardDimensions.XLARGE      | shape  |         |             |
| cardDimensions.XLARGE.lg   | shape  |         |             |
| cardDimensions.XLARGE.lg.w | number |         |             |
| cardDimensions.XLARGE.lg.h | number |         |             |
| cardDimensions.XLARGE.md   | shape  |         |             |
| cardDimensions.XLARGE.md.w | number |         |             |
| cardDimensions.XLARGE.md.h | number |         |             |
| cardDimensions.XLARGE.sm   | shape  |         |             |
| cardDimensions.XLARGE.sm.w | number |         |             |
| cardDimensions.XLARGE.sm.h | number |         |             |
| cardDimensions.XLARGE.xs   | shape  |         |             |
| cardDimensions.XLARGE.xs.w | number |         |             |
| cardDimensions.XLARGE.xs.h | number |         |             |

## External Links

### Source Code

[Source code](https://github.com/carbon-design-system/carbon-addons-iot-react/tree/next/packages/react/src/components/TableCard)

### Feedback

Help us improve this component by providing feedback, asking questions on Slack, or updating this file on
[GitHub](https://github.com/carbon-design-system/carbon-addons-iot-react/tree/next/packages/react/src/components/TableCard/TableCard.md).