import AppController from '../controller/controller';
import { AppView } from '../view/appView';
import SourcesPanel from '../view/sources/sourcesPanel';

const DEFAULT_SOURCES = ['bbc-news', 'associated-press', 'the-verge', 'wired'];

class App {
    private readonly controller: AppController;
    private readonly view: AppView;
    private readonly sourcesPanel: SourcesPanel;

    constructor() {
        this.controller = new AppController();
        this.view = new AppView();
        this.sourcesPanel = new SourcesPanel();
    }

    public start(): void {
        this.sourcesPanel.onSubmit((sourceIds) => this.loadNews(sourceIds));

        this.controller.getSources((data) => {
            this.view.drawSources(data);
            this.sourcesPanel.select(DEFAULT_SOURCES);
            this.loadNews(DEFAULT_SOURCES);
        });
    }

    private loadNews(sourceIds: ReadonlyArray<string>): void {
        this.controller.getNews(sourceIds, (data) => this.view.drawNews(data));
    }
}

export default App;
