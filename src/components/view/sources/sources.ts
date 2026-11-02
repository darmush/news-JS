import './sources.css';
import { Source } from '../../../types';

class Sources {
    draw(data: ReadonlyArray<Source>): void {
        const fragment = document.createDocumentFragment();
        const sourceItemTemp = document.querySelector('#sourceItemTemp');

        if (!(sourceItemTemp instanceof HTMLTemplateElement)) return;

        data.forEach((item) => {
            const sourceClone = document.importNode(sourceItemTemp.content, true);
            const sourceItem = sourceClone.querySelector('.source__item');
            const sourceName = sourceClone.querySelector('.source__item-name');

            if (sourceName) sourceName.textContent = item.name;
            if (sourceItem) sourceItem.setAttribute('data-source-id', item.id);

            fragment.append(sourceClone);
        });

        document.querySelector('.sources')?.append(fragment);
    }
}

export default Sources;
