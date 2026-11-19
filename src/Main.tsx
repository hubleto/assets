declare global {
  var dictionary: any;
  var hubleto: any;
}

//@ts-ignore
import $ from 'jquery';
//@ts-ignore
import React, { Component } from 'react';

import { HubletoReactUi } from "@hubleto/react-ui/core/Loader";
import App from '@hubleto/react-ui/core/App'
import request from "@hubleto/react-ui/core/Request";

// core hubleto react ui components
import Modal from "@hubleto/react-ui/components/fc/Modal";
import Table from "@hubleto/react-ui/components/fc/Table";
import Form from "@hubleto/react-ui/components/fc/Form";
import Spinner from "@hubleto/react-ui/components/fc/Spinner";
import Tree from "@hubleto/react-ui/components/cc/Tree";
import ErpSearch from "@hubleto/react-ui/components/cc/ErpSearch";

// inputs
import InputVarchar from "@hubleto/react-ui/components/fc/Inputs/Varchar";
import InputInt from "@hubleto/react-ui/components/fc/Inputs/Int";
import InputBoolean from "@hubleto/react-ui/components/fc/Inputs/Boolean";
import InputColor from "@hubleto/react-ui/components/fc/Inputs/Color";
import InputDateTime from "@hubleto/react-ui/components/fc/Inputs/DateTime";
import InputLookup from "@hubleto/react-ui/components/fc/Inputs/Lookup";
import InputImage from "@hubleto/react-ui/components/fc/Inputs/Image";
import InputHyperlink from "@hubleto/react-ui/components/fc/Inputs/Hyperlink";
import InputUserSelect from "@hubleto/react-ui/components/fc/Inputs/UserSelect";
import InputSharedWith from "@hubleto/react-ui/components/fc/Inputs/SharedWith";
import InputMultipleUsers from "@hubleto/react-ui/components/fc/Inputs/MultipleUsers";
import InputWysiwyg from "@hubleto/react-ui/components/cc/Inputs/Wysiwyg";
import InputTextareaWithHtmlPreview from "@hubleto/react-ui/components/fc/Inputs/TextareaWithHtmlPreview";
import InputJson from "@hubleto/react-ui/components/cc/Inputs/Json";
import InputJsonKeyValue from "@hubleto/react-ui/components/cc/Inputs/JsonKeyValue";
import InputTextareaMarkdown from "@hubleto/react-ui/components/fc/Inputs/TextareaMarkdown";


try {
  class HubletoErp extends HubletoReactUi {
    language: string = 'en';
    currencySymbol: string = '€';
    idUser: number = 0;
    userEmail: string = '';
    isPremium: boolean = false;
    user: any;
    users: any;
    apps: any = {};
    debugTranslations: boolean = false;
    locale: any = {};

    constructor(config: any) {
      super(config);

      this.idUser = config.idUser;
      this.userEmail = config.userEmail;
      this.isPremium = config.isPremium;
      this.language = config.language;
      this.dictionary = globalThis.dictionary;
      this.debugTranslations = config.debugTranslations;

      this.registerReactComponent('Modal', Modal);

      this.registerReactComponent('InputVarchar', InputVarchar);
      this.registerReactComponent('InputInt', InputInt);
      this.registerReactComponent('InputLookup', InputLookup);
      this.registerReactComponent('InputBoolean', InputBoolean);
      this.registerReactComponent('InputImage', InputImage);
      this.registerReactComponent('InputColor', InputColor);
      this.registerReactComponent('InputDateTime', InputDateTime);
      this.registerReactComponent('InputHyperlink', InputHyperlink);
      this.registerReactComponent('InputUserSelect', InputUserSelect);
      this.registerReactComponent('InputSharedWith', InputSharedWith);
      this.registerReactComponent('InputMultipleUsers', InputMultipleUsers);
      this.registerReactComponent('InputWysiwyg', InputWysiwyg);
      this.registerReactComponent('InputTextareaWithHtmlPreview', InputTextareaWithHtmlPreview);
      this.registerReactComponent('InputJson', InputJson);
      this.registerReactComponent('InputJsonKeyValue', InputJsonKeyValue);
      this.registerReactComponent('InputTextareaMarkdown', InputTextareaMarkdown);

      // Hubleto components
      this.registerReactComponent('Search', ErpSearch);
      this.registerReactComponent('Form', Form);
      this.registerReactComponent('Table', Table);
      this.registerReactComponent('Spinner', Spinner);
      this.registerReactComponent('Tree', Tree);
    }

    init() {
      for (let appNamespace in this.apps) {
        this.apps[appNamespace].init();
      }

      this.renderReactElements();
      this.createThemeObserver();
      this.registerShortcuts();
      this.getUsersInfo();
      this.loadLocale();
    }

    getUsersInfo() {
      request.post(
        'api/get-users',
        {},
        {},
        (data: any) => {
          this.users = data;
        }
      );
    }

    loadLocale() {
      const localeFromLocalStorage = localStorage.getItem("locale");
      if (localeFromLocalStorage) {
        try {
          this.locale = JSON.parse(localeFromLocalStorage);
        } catch (e) {
          this.locale = {
            'currencySymbol': '€',
            'decimalsSeparator': '.',
            'thousandsSeparator': ' ',
            'dateShortFormat': 'Y-m-d',
            'dateLongFormat': 'Y-m-d',
            'datetimeFormat': 'Y-m-d H:i:s',
            'timeFormat': 'H:i:s',
          }
        }
      } else {
        this.reloadLocale();
      }
    }

    reloadLocale() {
      request.post(
        'api/get-locale',
        {},
        {},
        (data: any) => {
          this.locale = data;
          localStorage.setItem("locale", JSON.stringify(data));
          // console.log('Reloaded locale', this.locale)
        }
      );
    }

    userHasRole(idRole: number) {
      if (!this.users) return false;

      const user = this.users[this.idUser];
      if (!user) return false;

      let hasRole = user.HAS_ALL_GRANTED;

      if (user.ROLES) {
        user.ROLES.map((role) => {
          if (role.id == idRole) hasRole = true;
        })
      }

      return hasRole;
    }

    translate(orig: string, context?: string, contextInner?: string, vars?: any): string {
      let translated: string = orig;

      if (this.language === 'en') translated = orig;
      else if (this.dictionary === null) translated = orig;
      else {
        context = (context ?? '').replaceAll('\\', '-').toLowerCase();
        contextInner = contextInner ?? '';

        if (
          this.dictionary[context]
          && this.dictionary[context][contextInner]
          && this.dictionary[context][contextInner][orig]
          && this.dictionary[context][contextInner][orig] != ''
        ) {
          translated = this.dictionary[context][contextInner][orig] ?? '';
        } else {
          translated = '';
          this.addToDictionary(orig, context, contextInner);
        }

        if (translated == '') translated = '**' + orig + '**';
      }
      
      if (vars) {
        Object.keys(vars).map((varName) => {
          const varValue = vars[varName];
          translated = translated.replace('{{ ' + varName + ' }}', varValue);
        })
      }

      return translated;
    }

    loadDictionary(language: string) {
      // if (language == 'en') return;

      // this.language = language;

      // request.get(
      //   'api/dictionary',
      //   { language: language },
      //   (data: any) => {
      //     this.dictionary = data;
      //   }
      // );
      this.dictionary = globalThis.dictionary;
    }

    addToDictionary(orig: string, context: string, contextInner: string) {
      if (!this.debugTranslations) return;
      request.get(
        'api/dictionary',
        {
          language: this.language,
          addNew: {
            orig: orig,
            context: context,
            contextInner: contextInner,
          }
        },
      );
    }

    registerApp(appNamespace: string, app: App) {
      app.namespace = appNamespace;
      this.apps[appNamespace] = app;
      // console.log('Registered app', appNamespace);
    }

    getApp(appNamespace: string) {
      return this.apps[appNamespace] ?? null;
    }

    createThemeObserver() {
      // MutationObserver looks for changes in DOM. Anytime a change is detected,
      // a light or dark theme is applied to changed or newly created DOM elements.
      (new MutationObserver((mutations, observer) => {
        if (localStorage.theme == "dark") {
          // Whenever the user explicitly chooses light mode
          $('*').addClass('dark');
        } else {
          // Whenever the user explicitly chooses dark mode
          $('*').removeClass('dark');
        }
      })).observe(document, { subtree: true, attributes: true });
    }


    formatCurrency(value: number, currencyIsoCode?: string, localeIsoCode?: string): string {
      currencyIsoCode = currencyIsoCode ?? (this.locale.currencyIsoCode ?? 'EUR');
      localeIsoCode = localeIsoCode ?? (this.locale.isoCode ?? 'en-EN');

      return new Intl.NumberFormat(
        localeIsoCode,
        { style: "currency", currency: currencyIsoCode }
      ).format(value);
    }

  }

  const hubleto = new HubletoErp(globalThis.config);
  globalThis.hubleto = hubleto;

} catch (e) {
  console.log('Hubleto failed to load.');
}