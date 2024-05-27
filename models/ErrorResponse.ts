const docref = 'https://github.com/ChlodAlejandro/deputy-dispatch';

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

/**
 * The ErrorResponseBuilder allows for the creation of MediaWiki API-like errors.
 * As of now, only the `wikitext`, `plaintext`, `raw`, and `bc` formats are supported.
 * An additional `text` format is supported (as `plaintext` and `wikitext` result in
 * the same output).
 */
export default class ErrorResponseBuilder {

	static generic = new ErrorResponseBuilder()
		.add( 'generic-error', {
			text: 'A generic error.',
			key: 'apierror-generic'
		} );

	private errors: { code: string, message: ErrorResponseMessage, data?: Record<string, any> }[] =
		[];

	/**
	 * @return `true` if this builder has no errors, `false` otherwise.
	 */
	get empty(): boolean {
		return !this.errors.length;
	}

	/**
	 * Clones an ErrorResponseBuilder
	 *
	 * @return An ErrorResponseBuilder with the same errors as this one
	 */
	clone(): ErrorResponseBuilder {
		const builder = new ErrorResponseBuilder();
		for ( const error of this.errors ) {
			builder.errors.push( error );
		}
		return builder;
	}

	/**
	 * Add an error to this response.
	 *
	 * @param code The error code
	 * @param message The error message
	 * @param data The data associated with the error
	 * @chainable
	 * @return {ErrorResponseBuilder} This builder
	 */
	add(
		code: string,
		message: ErrorResponseMessage,
		data?: Record<string, any>
	): ErrorResponseBuilder {
		this.errors.push( { code, message, data } );
		return this;
	}

	/**
	 * Combine all errors from the given builder into this builder.
	 *
	 * @param builder The builder to get errors from
	 * @return {ErrorResponseBuilder} This builder
	 */
	with( builder: ErrorResponseBuilder ): ErrorResponseBuilder {
		this.errors.push( ...builder.errors );
		return this;
	}

	/**
	 * Drop all stored errors. Use this to disregard any and all previously registered
	 * errors.
	 *
	 * @chainable
	 * @return {ErrorResponseBuilder} This builder
	 */
	clear(): ErrorResponseBuilder {
		this.errors = [];
		return this;
	}

	/**
	 * Builds the response.
	 *
	 * @param errorformat
	 * @return A MediaWiki-like error response.
	 */
	build(
		errorformat: ErrorFormat = 'text'
	): ErrorResponse {
		if ( this.empty ) {
			return null;
		}

		let errors;

		if ( errorformat === 'bc' ) {
			errors = {
				code: this.errors[ 0 ].code,
				info: this.errors[ 0 ].message.text,
				...( this.errors[ 0 ].data ?? {} )
			};
		} else {
			errors = [];
			for ( const error of this.errors ) {
				let messageObject;

				switch ( errorformat ) {
					case 'wikitext':
					case 'plaintext':
					case 'text':
						messageObject = { text: error.message.text };
						break;
					case 'raw':
						messageObject = { key: error.message.key, params: error.message.params };
						break;
				}

				errors.push( {
					code: error.code,
					...messageObject,
					module: 'deputy-dispatch',
					...( error.data ?? {} )
				} );
			}
		}

		return { errors, docref };
	}

}
