﻿using Microsoft.AspNetCore.DataProtection;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Options;

namespace Inspectify.Models.Identity
{
    public class EmailConfirmationTokenProvider<TUser> : DataProtectorTokenProvider<TUser> where TUser : class
    {
        public EmailConfirmationTokenProvider(IDataProtectionProvider dataProtectionProvider, 
            IOptions<EmailConfirmationTokenProviderOptions> options) : base(dataProtectionProvider, options)
        {
        }
    }

    public class EmailConfirmationTokenProviderOptions : DataProtectionTokenProviderOptions
    {

    }
}
