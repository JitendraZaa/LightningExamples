<aura:application implements="force:appHostable" >
	 <ltng:require styles="/resource/SLD_0_12_2/assets/styles/salesforce-lightning-design-system-ltng.css" />
    
    <aura:attribute name="modalMessage" type="String" default="Default Message"/>
    <aura:attribute name="modalTitle" type="String" default="Header Message"/>
    
    <aura:dependency resource="markup://c:modalDialog" />
    
    <div class="slds">
        <div class="slds-form-element slds-size--1-of-2 slds-m-around--xx-large">
        	<ui:inputText label="Title for Modal Dialog" value="{!v.modalTitle}"  class="slds-input"/>
        </div>
        <div class="slds-form-element slds-size--1-of-2 slds-m-around--xx-large">
        	<ui:inputText label="Message to show in Modal Dialog" value="{!v.modalMessage}"  class="slds-input"/>
        </div>
        
        <div class="slds-size--1-of-2 slds-m-around--xx-large slds-clearfix">
        	<ui:button label="Open Modal Dialog" press="{!c.openDialog}" class="slds-button slds-button--destructive slds-float--right"  />
        </div>
           
        <div aura:id="ModalDialogPlaceholder" />
    </div>
</aura:application>