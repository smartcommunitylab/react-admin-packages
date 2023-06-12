import { TranslationMessages } from "ra-core";

const italianMessages: TranslationMessages = {
  ra: {
    action: {
      add_filter: "Aggiungi filtro",
      add: "Aggiungi",
      back: "Indietro",
      bulk_actions:
        "1 elemento selezionato |||| %{smart_count} elementi selezionati",
      cancel: "Cancella",
      clear_array_input: "Pulisci la lista",
      clear_input_value: "Pulisci valore",
      clone: "Clona",
      confirm: "Conferma",
      create: "Crea",
      create_item: "Crea %{item}",
      delete: "Rimuovi",
      edit: "Modifica",
      export: "Esporta",
      list: "Lista",
      refresh: "Ricarica",
      remove_filter: "Rimuovi questo filtro",
      remove_all_filters: "Rimuovi tutti i filtri",
      remove: "Rimuovi",
      save: "Salva",
      search: "Ricerca",
      select_all: "Seleziona tutto",
      select_row: "Seleziona riga",
      show: "Mostra",
      sort: "Ordina",
      undo: "Annulla",
      unselect: "Deseleziona",
      expand: "Espandi",
      close: "Chiudi",
      open_menu: "Apri menu",
      close_menu: "Chiudi menu",
      update: "Aggiorna",
      move_up: "Muovi sopra",
      move_down: "Muovi sotto",
      open: "Apri",
      toggle_theme: "Alterna tema",
      select_columns: "Colonne",
    },
    boolean: {
      true: "Si",
      false: "No",
      null: " ",
    },
    page: {
      create: "Crea %{name}",
      dashboard: "Cruscotto",
      edit: "%{name} %{recordRepresentation}",
      error: "Qualcosa è andato storto",
      list: "%{name}",
      loading: "Caricamento",
      not_found: "Non trovato",
      show: "%{name} %{recordRepresentation}",
      empty: "Ancora nessun %{name}.",
      invite: "Vuoi aggiungerne uno?",
    },
    input: {
      file: {
        upload_several:
          "Rilascia i file per caricare, o clicca per selezionare.",
        upload_single:
          "Rilascia un file per caricare, o clicca per selezionare.",
      },
      image: {
        upload_several:
          "Trascina le immagini per caricarle, o clicca per selezionare.",
        upload_single:
          "Trascina una immagine per caricarla, o clicca per selezionare.",
      },
      references: {
        all_missing: "Impossibile trovare i dati referenziati",
        many_missing:
          "Almeno uno dei dati referenziati sembra non essere disponibile.",
        single_missing:
          "Il dato referenziato sembra non essere più disponibile.",
      },
      password: {
        toggle_visible: "Nascondi password",
        toggle_hidden: "Mostra password",
      },
    },
    message: {
      about: "About",
      are_you_sure: "Sei sicuro?",
      auth_error:
        "Si è verificato un errore durante la convalida del token di autenticazione.",
      bulk_delete_content:
        "Sei sicuro di voler rimuovere questo %{name}? |||| Sei sicuro di voler rimuovere questi %{smart_count} elementi?",
      bulk_delete_title: "Rimuovi %{name} |||| Rimuovi %{smart_count} %{name}",
      bulk_update_content:
        "Sei sicuro di voler aggiornare questo %{name}? |||| Sei sicuro di voler aggiornare questi %{smart_count} elementi?",
      bulk_update_title:
        "Aggiorna %{name} |||| Aggiorna %{smart_count} %{name}",
      clear_array_input: "Sei sicuro di voler cancellare l'intera lista?",
      delete_content: "Sei sicuro di voler rimuovere questo elemento?",
      delete_title: "Rimuovi %{name} #%{id}",
      details: "Dettagli",
      error:
        "Si è verificato un errore del client e non è stato possibile completare la tua richiesta.",
      invalid_form:
        "Il modulo non è valido. Si prega di verificare la presenza di errori",
      loading: "La pagina si sta caricando, solo un momento per favore",
      no: "No",
      not_found:
        "O hai digitato un URL sbagliato o hai seguito un link non valido.",
      yes: "Si",
      unsaved_changes:
        "Alcune delle tue modifiche non sono state salvate. Sei sicuro di volerle ignorare?",
    },
    navigation: {
      no_results: "Nessun risultato trovato",
      no_more_results:
        "Il numero di pagina %{page} è fuori dai limiti. Prova la pagina precedente.",
      page_out_of_boundaries: "La pagina numero %{page} è fuori dai limiti",
      page_out_from_end: "Impossibile andare oltre l'ultima pagina",
      page_out_from_begin: "Impossibile andare indietro dalla prima pagina",
      page_range_info: "%{offsetBegin}-%{offsetEnd} di %{total}",
      partial_page_range_info:
        "%{offsetBegin}-%{offsetEnd} di più di %{offsetEnd}",
      current_page: "Pagina %{page}",
      page: "Vai a pagina %{page}",
      first: "Vai alla prima pagina",
      last: "Vai all'ultima pagina",
      next: "Vai alla pagina successiva",
      previous: "Vai alla pagina precedente",
      page_rows_per_page: "Elementi per pagina:",
      skip_nav: "Salta al contenuto",
    },
    sort: {
      sort_by: "Ordina per %{field} %{order}",
      ASC: "crescente",
      DESC: "decrescente",
    },
    auth: {
      auth_check_error: "Autenticarsi per proseguire",
      user_menu: "Profilo",
      username: "Nome utente",
      password: "Password",
      sign_in: "Login",
      sign_in_error: "Autenticazione non riuscita, riprova",
      logout: "Logout",
    },
    notification: {
      updated: "Elemento aggiornato |||| %{smart_count} elementi aggiornati",
      created: "Elemento creato",
      deleted: "Elemento rimosso |||| %{smart_count} elementi rimossi",
      bad_item: "Elemento non valido",
      item_doesnt_exist: "Elemento non esistente",
      http_error: "Errore di comunicazione con il server",
      data_provider_error: "dataProvider error. Check the console for details.",
      i18n_error:
        "Impossibile caricare le traduzioni per il linguaggio richiesto",
      canceled: "Azione cancellata",
      logged_out: "La sessione è terminata, prego riconnettersi.",
      not_authorized: "Non sei autorizzato ad accedere a questa risorsa.",
    },
    validation: {
      required: "Campo obbligatorio",
      minLength: "Deve essere almeno %{min} caratteri",
      maxLength: "Deve essere %{max} caratteri o meno",
      minValue: "Deve essere almeno %{min}",
      maxValue: "Deve essere %{max} o meno",
      number: "Deve essere un numero",
      email: "Deve essere una email valida",
      oneOf: "Deve essere uno tra: %{options}",
      regex: "Deve corrispondere al formato (regexp): %{pattern}",
    },
    saved_queries: {
      label: "Ricerche salvate",
      query_name: "Nome ricerca",
      new_label: "Salva la ricerca corrente...",
      new_dialog_title: "Salva la ricerca corrente come",
      remove_label: "Rimuovi la ricerca salvata",
      remove_label_with_name: 'Rinomina la ricerca "%{name}"',
      remove_dialog_title: "Eliminare la ricerca salvata?",
      remove_message:
        "Sei sicuro di voler rimuovere questo elemento dalla lista di ricerche salvate?",
      help: "Filtra la lista e salva questa query per utilizzi futuri",
    },
    configurable: {
      customize: "Personalizza",
      configureMode: "Configura la pagina",
      inspector: {
        title: "Inspector",
        content: "Hover the application UI elements to configure them",
        reset: "Reset Settings",
        hideAll: "Nascondi tutto",
        showAll: "Mostra tutto",
      },
      Datagrid: {
        title: "Tabella",
        unlabeled: "Colonna senza etichetta #%{column}",
      },
      SimpleForm: {
        title: "Modulo",
        unlabeled: "Campo senza etichetta #%{input}",
      },
      SimpleList: {
        title: "Lista",
        primaryText: "Testo primario",
        secondaryText: "Testo secondario",
        tertiaryText: "Testo terziario",
      },
    },
  },
};

export default italianMessages;
