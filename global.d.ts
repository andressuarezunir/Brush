type EnMessages = typeof import("./src/messages/en.json");
type EsMessages = typeof import("./src/messages/es.json");

declare interface IntlMessages extends EnMessages, EsMessages {}
