require('./index.css')

const icons = require('@codexteam/icons');

class AlignmentBlockTune {
    static get isTune() {
        return true;
    }

    constructor({ api, data, config, block}) {
        this.api = api;
        this.block = block;

        this.settings = config;
        this.data = data || { alignment: this.getAlignment() }
        this.alignmentSettings = [
            {
                value: 'left',
                name: 'Left',
                icon: icons.IconAlignLeft
            },

            {
                value: 'center',
                name: 'Center',
                icon: icons.IconAlignCenter
            },
        ];

        this._CSS = {
            alignment: {
                left: 'ce-tune-alignment--left',
                center: 'ce-tune-alignment--center',
            }
        }
    }

    wrap(blockContent) {
        this.wrapper = this.make("div", [
            this._CSS.alignment[this.data.alignment],
        ]);

        this.wrapper.append(blockContent)

        return this.wrapper
    }

    render() {
        const options = this.alignmentSettings.map((item) => ({
            icon: item.icon,
            title: this.api.i18n.t(item.name),
            onActivate: () => {
                this.data.alignment = item.value;

                this.wrapper.classList.remove(this._CSS.alignment.left);
                this.wrapper.classList.remove(this._CSS.alignment.center);

                this.wrapper.classList.add(this._CSS.alignment[this.data.alignment]);
            },
            isActive: this.data.alignment === item.value,
            closeOnActivate: true,
        }));

        return [
            {
                name: 'alignment',
                title: this.api.i18n.t('Alignment'),
                icon: icons.IconAlignLeft,
                children: {
                    items: options
                },
            },
        ];
    }

    save() {
        return this.data;
    }

    getAlignment(){
        if (this.settings?.blocks?.[this.block.name]) {
            return this.settings.blocks[this.block.name]
        }

        if(this.settings?.default){
            return this.settings.default
        }

        return 'left'
    }

    make(tagName, classNames = null, attributes = {}) {
        const el = document.createElement(tagName);

        if (Array.isArray(classNames)) {
            el.classList.add(...classNames);
        } else if (classNames) {
            el.classList.add(classNames);
        }

        for (const attrName in attributes) {
            el[attrName] = attributes[attrName];
        }
        return el;
    }
}

module.exports = AlignmentBlockTune;
