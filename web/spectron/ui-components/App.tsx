import * as React from 'react';
import {ListOptionType, ListSelector} from '../../js/ui/list_selector/ListSelector';
import {DocRepoTableDropdown} from '../../../apps/repository/js/doc_repo/DocRepoTableDropdown';
import {AnnotationSidebar} from '../../js/annotation_sidebar/AnnotationSidebar';
import {MockDocMetas} from '../../js/metadata/DocMetas';
import {Proxies} from '../../js/proxies/Proxies';
import {Rect} from '../../js/Rect';
import {TextRect} from '../../js/metadata/TextRect';
import {TextHighlightRecords} from '../../js/metadata/TextHighlightRecords';
import {ViewOrEditCommentExample} from './ViewOrEditCommentExample';
import {FlashcardComponentExample} from './FlashcardComponentExample';
import {WhatsNewContent} from '../../../apps/repository/js/splash/splashes/whats_new/WhatsNewContent';
import {CloudSyncOverviewContent} from '../../js/ui/cloud_auth/CloudSyncOverviewContent';
import {CloudSyncConfiguredContent} from '../../js/ui/cloud_auth/CloudSyncConfiguredContent';
import {HighlighterIcon} from '../../js/ui/standard_icons/HighlighterIcon';
import {ToggleButton} from '../../js/ui/ToggleButton';
import {TagInput} from '../../../apps/repository/js/TagInput';
import {Tag} from '../../../web/js/tags/Tag';
import {RelatedTags} from '../../js/tags/related/RelatedTags';
import {CommentIcon} from '../../js/ui/standard_icons/CommentIcon';
import {FlashcardIcon} from '../../js/ui/standard_icons/FlashcardIcon';
import {FlashcardInput} from '../../js/annotation_sidebar/child_annotations/flashcards/flashcard_input/FlashcardInput';
import {FlashcardInputForCloze} from '../../js/annotation_sidebar/child_annotations/flashcards/flashcard_input/FlashcardInputForCloze';
import {FlashcardInputForFrontAndBack} from '../../js/annotation_sidebar/child_annotations/flashcards/flashcard_input/FlashcardInputForFrontAndBack';
import {EditComment} from '../../js/annotation_sidebar/child_annotations/comments/EditComment';
import {DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown} from 'reactstrap';
import {ExportButton} from '../../js/ui/export/ExportButton';
import {EditorsPicksContent} from '../../../apps/repository/js/editors_picks/EditorsPicksContent';
import {AnkiReviewContent} from './AnkiReviewContent';
import ReadingProgressTable from '../../../apps/repository/js/stats/ReadingProgressTable';
import {ContextMenuWrapper, prepareContextMenuHandlers} from '@burtonator/react-context-menu-wrapper';
import {TestMenu} from './TestMenu';
import {Feedback} from '../../js/ui/feedback/Feedback';
import Button from 'reactstrap/lib/Button';
import {ProgressToasters} from '../../js/ui/progress_toaster/ProgressToasters';
import {AccountControlBar} from '../../../web/js/ui/cloud_auth/AccountControlBar';
import {NULL_FUNCTION} from '../../js/util/Functions';
import {AccountControlDropdown} from '../../../web/js/ui/cloud_auth/AccountControlDropdown';
import {RichTextFeatureIntro} from '../../../web/js/annotation_sidebar/RichTextFeatureIntro';
import {SimpleTooltip} from '../../js/ui/tooltip/SimpleTooltip';
import {SimpleTooltipEx} from '../../js/ui/tooltip/SimpleTooltipEx';
import {ContextMenu} from '../../js/ui/context_menu/ContextMenu';
import {MenuItem} from '@burtonator/react-dropdown';
import {ContextMenuMessages} from '../../js/contextmenu/ContextMenuMessages';
import {DocContextMenu} from './DocContextMenu';
import {Dialogs} from '../../js/ui/dialogs/Dialogs';
import {DocContextMenu2} from './DocContextMenu2';
import Dropdown from 'reactstrap/lib/Dropdown';

interface DropdownContext {
    toggle: () => void;
}


class App<P> extends React.Component<{}, IAppState> {

    constructor(props: P, context: any) {
        super(props, context);

        this.toggleDropDown = this.toggleDropDown.bind(this);
        this.toggleSplit = this.toggleSplit.bind(this);
        this.state = {
            dropdownOpen: false,
            splitButtonOpen: false
        };
    }

    public getChildContext(): DropdownContext {
        return {
            toggle: NULL_FUNCTION
        };
    }

    public render() {

        // ProgressBar.create();

        const options: ListOptionType[] = [
            {
                id: "title",
                label: "Title",
                selected: true
            },
            {
                id: "tags",
                label: "Tags",
                selected: false
            }
        ];

        const docMeta = Proxies.create(MockDocMetas.createWithinInitialPagemarks('0x001', 4));

        const rects: Rect[] = [ new Rect({top: 100, left: 100, right: 200, bottom: 200, width: 100, height: 100}) ];
        const textSelections: TextRect[] = [new TextRect({text: "hello world"})];
        const text = "hello world";

        const textHighlight = TextHighlightRecords.create(rects, textSelections, {TEXT: text});

        // const ref = Refs.createFromAnnotationType(textHighlight.id,
        // AnnotationType.TEXT_HIGHLIGHT);

        docMeta.pageMetas[1].textHighlights[textHighlight.id] = textHighlight.value;

        // let flashcard = Flashcards.createFrontBack(front, back, ref);
        //
        // // TODO: an idiosyncracie of the proxies system is that it mutates
        // the // object so if it's read only it won't work.  This is a bug
        // with // Proxies so I need to also fix that bug there in the future.
        // flashcard = Object.assign({}, flashcard);
        // annotation.pageMeta.flashcards[flashcard.id] = flashcard;


        // TODO: we have to create some flashcards and comments for this object
        // so that the annotation sidear renders.

        const relatedTags = new RelatedTags();

        relatedTags.update('0x01', 'set', 'linux');
        relatedTags.update('0x01', 'set', 'microsoft');

        relatedTags.update('0x02', 'set', 'linux');
        relatedTags.update('0x02', 'set', 'google');

        relatedTags.update('0x03', 'set', 'linux');
        relatedTags.update('0x03', 'set', 'microsoft');

        relatedTags.update('0x04', 'set', 'linux');
        relatedTags.update('0x04', 'set', 'microsoft');

        relatedTags.update('0x05', 'set', 'linux');
        relatedTags.update('0x05', 'set', 'google');

        const tags: Tag[] = [
            {id: 'microsoft', label: 'microsoft'},
            {id: 'google', label: 'google'}
        ];

        const existingTags: Tag[] = [
            {id: 'google', label: 'google'}
        ];

        const steps = [
            {
                target: '.my-first-step',
                content: 'This is my awesome feature!',
                disableBeacon: true
            },
            {
                target: '.my-other-step',
                content: 'This another awesome feature!',
            },
        ];
        // Toaster.success('A new update for Polar was downloaded.  Please
        // restart.', 'Update downloaded', { requiresAcknowledgment: true,
        // preventDuplicates: true });  Toaster.info('X A new update for Polar
        // was downloaded.  Please restart.', 'Update downloaded', {
        // requiresAcknowledgment: true, preventDuplicates: true });

        // ProgressToasters.create()
        //     .then(progressUpdater => {
        //         progressUpdater.update({title: "Finding files (5) ... ",
        // status:
        // '/home/burton/projects/polar-bookshelf/web/js/apps/repository/FileImportController.ts'});
        // });

        // Dialogs.prompt({title: 'What is the name of your widget?',
        // placeholder: 'give me something', onCancel: NULL_FUNCTION, onDone:
        // NULL_FUNCTION }); Dialogs.confirm({title: 'Are you sure you want to
        // destroy the planet?', onCancel: NULL_FUNCTION, onConfirm:
        // NULL_FUNCTION });

        return (
            //
            // <div tabIndex={0}
            //      onMouseDown={(event) => event.currentTarget.focus()}
            //      onKeyPress={() => console.log("key press")}
            //      onKeyDown={() => console.log("key down")}>
            //
            //     hello worldasdfasdf
            //
            // </div>

            <div>

                <SimpleTooltipEx text={`
                                 This is the text for the tooltip
                                 `}>

                    <div>
                        this is code for the new tooltip
                    </div>

                </SimpleTooltipEx>

                <div id="old-tooltip-example">
                    this is code for the old tooltip
                </div>


                <SimpleTooltip target="old-tooltip-example">
                    this is an old tooltip.
                </SimpleTooltip>

                <DocContextMenu onSetTitle={() => console.log("set title")}>

                    <div>
                        Right click or long-tap on this box
                    </div>

                </DocContextMenu>

                <DocContextMenu2 >

                    <div>
                        Right click or long-tap on this box
                    </div>

                </DocContextMenu2>

                {/*<Dropdown isOpen={true} toggle={NULL_FUNCTION}>*/}
                    {/*<DropdownToggle tag="div">*/}
                    {/*</DropdownToggle>*/}
                    {/*<DropdownMenu>*/}
                        {/*<DropdownItem header>Header</DropdownItem>*/}
                        {/*<DropdownItem>Some Action</DropdownItem>*/}
                        {/*<DropdownItem disabled>Action (disabled)</DropdownItem>*/}
                        {/*<DropdownItem divider />*/}
                        {/*<DropdownItem>Foo Action</DropdownItem>*/}
                        {/*<DropdownItem>Bar Action</DropdownItem>*/}
                        {/*<DropdownItem>Quo Action</DropdownItem>*/}
                    {/*</DropdownMenu>*/}
                {/*</Dropdown>*/}

                asdf

                {/*<Dropdown isOpen={true} toggle={NULL_FUNCTION}>*/}

                    <DropdownItem header>Header</DropdownItem>
                    <DropdownItem onClick={NULL_FUNCTION}>Some Action</DropdownItem>
                    <DropdownItem disabled>Action (disabled)</DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem>Foo Action</DropdownItem>
                    <DropdownItem>Bar Action</DropdownItem>
                    <DropdownItem>Quo Action</DropdownItem>

                {/*</Dropdown>*/}

            </div>

        );
    }


    private toggleDropDown() {

        this.setState({
            splitButtonOpen: this.state.splitButtonOpen,
            dropdownOpen: !this.state.dropdownOpen
        });

    }

    private toggleSplit() {

        this.setState({
            splitButtonOpen: !this.state.splitButtonOpen
        });

    }



}

export default App;

interface IAppState {
    dropdownOpen: boolean;
    splitButtonOpen: boolean;

}


