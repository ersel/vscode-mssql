/*---------------------------------------------------------------------------------------------
*  Copyright (c) Microsoft Corporation. All rights reserved.
*  Licensed under the MIT License. See License.txt in the project root for license information.
*--------------------------------------------------------------------------------------------*/

'use strict';
import vscode = require('vscode');
import Constants = require('./constants/constants');
import * as LocalizedConstants from './constants/localizedConstants';
import MainController from './controllers/mainController';
import VscodeWrapper from './controllers/vscodeWrapper';

let controller: MainController = undefined;

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext): Promise<boolean> {
    let vscodeWrapper = new VscodeWrapper();
    controller = new MainController(context, undefined, vscodeWrapper);
    context.subscriptions.push(controller);

    // Checking if localization should be applied
    let config = vscodeWrapper.getConfiguration(Constants.extensionConfigSectionName);
    let applyLocalization = config[Constants.configApplyLocalization];
    if (applyLocalization) {
        LocalizedConstants.loadLocalizedConstants(vscode.env.language);
    }

    return controller.activate();
}

// this method is called when your extension is deactivated
export function deactivate(): void {
    if (controller) {
        controller.deactivate();
        controller.dispose();
    }
}

/**
 * Exposed for testing purposes
 */
export function getController(): MainController {
    return controller;
}
