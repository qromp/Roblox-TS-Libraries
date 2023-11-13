import Roact from "@rbxts/roact";
import { ScrollView, ScrollViewProps } from "./scrollView";
import { NodeHandle, StyleProp, ViewStyle } from "./unimplemented";
import { ListRenderItemInfo, VirtualizedListWithoutRenderItemProps } from "./virtualizedList";


/**
 * @see https://reactnative.dev/docs/sectionlist
 */
type DefaultSectionT = {
    [key: string]: any;
};

export interface SectionListScrollParams {
    animated?: boolean | undefined;
    itemIndex: number;
    sectionIndex: number;
    viewOffset?: number | undefined;
    viewPosition?: number | undefined;
}

export interface SectionBase<ItemT, SectionT = DefaultSectionT> {
    data: ReadonlyArray<ItemT>;

    key?: string | undefined;

    renderItem?: SectionListRenderItem<ItemT, SectionT> | undefined;

    ItemSeparatorComponent?: Roact.ComponentType<any> | null | undefined;

    keyExtractor?: ((item: ItemT, index: number) => string) | undefined;
}
export type SectionListData<ItemT, SectionT = DefaultSectionT> = SectionBase<ItemT, SectionT> & SectionT;

/**
 * @see https://reactnative.dev/docs/sectionlist.html#props
 */
export interface SectionListRenderItemInfo<ItemT, SectionT = DefaultSectionT> extends ListRenderItemInfo<ItemT> {
    section: SectionListData<ItemT, SectionT>;
}

export type SectionListRenderItem<ItemT, SectionT = DefaultSectionT> = (
    info: SectionListRenderItemInfo<ItemT, SectionT>,
) => Roact.Element | null;

export interface SectionListProps<ItemT, SectionT = DefaultSectionT>
    extends VirtualizedListWithoutRenderItemProps<ItemT>
{
    /**
     * Rendered in between adjacent Items within each section.
     */
    ItemSeparatorComponent?: Roact.ComponentType<any> | null | undefined;

    /**
     * Rendered when the list is empty.
     */
    ListEmptyComponent?: Roact.ComponentType<any> | Roact.Element | null | undefined;

    /**
     * Rendered at the very end of the list.
     */
    ListFooterComponent?: Roact.ComponentType<any> | Roact.Element | null | undefined;

    /**
     * Styling for internal View for ListFooterComponent
     */
    ListFooterComponentStyle?: StyleProp<ViewStyle> | undefined | null;

    /**
     * Rendered at the very beginning of the list.
     */
    ListHeaderComponent?: Roact.ComponentType<any> | Roact.Element | null | undefined;

    /**
     * Styling for internal View for ListHeaderComponent
     */
    ListHeaderComponentStyle?: StyleProp<ViewStyle> | undefined | null;

    /**
     * Rendered in between each section.
     */
    SectionSeparatorComponent?: Roact.ComponentType<any> | Roact.Element | null | undefined;

    /**
     * A marker property for telling the list to re-render (since it implements PureComponent).
     * If any of your `renderItem`, Header, Footer, etc. functions depend on anything outside of the `data` prop,
     * stick it here and treat it immutably.
     */
    extraData?: any;

    /**
     * `getItemLayout` is an optional optimization that lets us skip measurement of dynamic
     * content if you know the height of items a priori. getItemLayout is the most efficient,
     * and is easy to use if you have fixed height items, for example:
     * ```
     * getItemLayout={(data, index) => (
     *   {length: ITEM_HEIGHT, offset: ITEM_HEIGHT * index, index}
     * )}
     * ```
     */
    getItemLayout?:
        | ((
            data: SectionListData<ItemT, SectionT>[] | null,
            index: number,
        ) => { length: number; offset: number; index: number })
        | undefined;

    /**
     * How many items to render in the initial batch
     */
    initialNumToRender?: number | undefined;

    /**
     * Reverses the direction of scroll. Uses scale transforms of -1.
     */
    inverted?: boolean | null | undefined;

    /**
     * Used to extract a unique key for a given item at the specified index. Key is used for caching
     * and as the react key to track item re-ordering. The default extractor checks `item.key`, then
     * falls back to using the index, like React does.
     */
    keyExtractor?: ((item: ItemT, index: number) => string) | undefined;

    /**
     * Called once when the scroll position gets within onEndReachedThreshold of the rendered content.
     */
    onEndReached?: ((info: { distanceFromEnd: number }) => void) | null | undefined;

    /**
     * How far from the end (in units of visible length of the list) the bottom edge of the
     * list must be from the end of the content to trigger the `onEndReached` callback.
     * Thus a value of 0.5 will trigger `onEndReached` when the end of the content is
     * within half the visible length of the list.
     */
    onEndReachedThreshold?: number | null | undefined;

    /**
     * If provided, a standard RefreshControl will be added for "Pull to Refresh" functionality.
     * Make sure to also set the refreshing prop correctly.
     */
    onRefresh?: (() => void) | null | undefined;

    /**
     * Used to handle failures when scrolling to an index that has not been measured yet.
     * Recommended action is to either compute your own offset and `scrollTo` it, or scroll as far
     * as possible and then try again after more items have been rendered.
     */
    onScrollToIndexFailed?:
        | ((info: {
            index: number;
            highestMeasuredFrameIndex: number;
            averageItemLength: number;
        }) => void)
        | undefined;

    /**
     * Set this true while waiting for new data from a refresh.
     */
    refreshing?: boolean | null | undefined;

    /**
     * Default renderer for every item in every section. Can be over-ridden on a per-section basis.
     */
    renderItem?: SectionListRenderItem<ItemT, SectionT> | undefined;

    /**
     * Rendered at the top of each section. Sticky headers are not yet supported.
     */
    renderSectionHeader?:
        | ((info: { section: SectionListData<ItemT, SectionT> }) => Roact.Element | null)
        | undefined;

    /**
     * Rendered at the bottom of each section.
     */
    renderSectionFooter?:
        | ((info: { section: SectionListData<ItemT, SectionT> }) => Roact.Element | null)
        | undefined;

    /**
     * An array of objects with data for each section.
     */
    sections: ReadonlyArray<SectionListData<ItemT, SectionT>>;

    /**
     * Render a custom scroll component, e.g. with a differently styled `RefreshControl`.
     */
    renderScrollComponent?: ((props: ScrollViewProps) => Roact.Element) | undefined;

    /**
     * Note: may have bugs (missing content) in some circumstances - use at your own risk.
     *
     * This may improve scroll performance for large lists.
     */
    removeClippedSubviews?: boolean | undefined;

    /**
     * Makes section headers stick to the top of the screen until the next one pushes it off.
     * Only enabled by default on iOS because that is the platform standard there.
     */
    stickySectionHeadersEnabled?: boolean | undefined;

    /**
     * Uses legacy MetroListView instead of default VirtualizedSectionList
     */
    legacyImplementation?: boolean | undefined;
}

export class SectionList<ItemT = any, SectionT = DefaultSectionT> extends Roact.Component<
    SectionListProps<ItemT, SectionT>
> {
    /**
     * Scrolls to the item at the specified sectionIndex and itemIndex (within the section)
     * positioned in the viewable area such that viewPosition 0 places it at the top
     * (and may be covered by a sticky header), 1 at the bottom, and 0.5 centered in the middle.
     */
    scrollToLocation(params: SectionListScrollParams): void;

    /**
     * Tells the list an interaction has occurred, which should trigger viewability calculations, e.g.
     * if `waitForInteractions` is true and the user has not scrolled. This is typically called by
     * taps on items or by navigation actions.
     */
    recordInteraction(): void;

    /**
     * Displays the scroll indicators momentarily.
     *
     * @platform ios
     */
    flashScrollIndicators(): void;

    /**
     * Provides a handle to the underlying scroll responder.
     */
    getScrollResponder(): ScrollView | undefined;

    /**
     * Provides a handle to the underlying scroll node.
     */
    getScrollableNode(): NodeHandle | undefined;

	public render(): Roact.Element | undefined; // OverHash deviation: patch for roact typings
}
