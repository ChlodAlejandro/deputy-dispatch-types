export const DISPATCH_DOCREF = 'https://github.com/ChlodAlejandro/deputy-dispatch';

export type ErrorFormat = `${ 'wiki' | 'plain' | '' }text` | 'raw' | 'bc';

export interface ErrorResponseMessage {
	/**
	 * The message key. Used on the client side for localization.
	 */
	key: string;
	/**
	 * The parameters for this message when localizing.
	 */
	params?: string[];
	/**
	 * Fallback text in case the errorformat requested was `*text`. English is always used.
	 */
	text: string;
}

export interface Error {
	/**
	 * The error code
	 */
	code: string;
	/**
	 * The message of the error. Only available if the errorformat is
	 * `plaintext` or `wikitext`.
	 */
	text?: string;
	/**
	 * The key of the error's message. Used for localization. Only available
	 * if the errorformat is `raw`.
	 */
	key?: string;
	/**
	 * The params of the error's message. Used for localization. Only available
	 * if the errorformat is `raw`.
	 */
	params?: string[];
}

export interface ErrorResponse {
	/**
	 * The errors of this response.
	 */
	errors: Error[];
	/**
	 * A human-readable message for where to find help.
	 */
	docref: string;
}
