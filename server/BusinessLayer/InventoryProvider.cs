using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Inspectify.DAL;
using Inspectify.Models;
using Microsoft.EntityFrameworkCore;

namespace Inspectify.BusinessLayer
{
    public interface IInventoryProvider
    {
        Task<Template> AddTemplate(Template template);
        Task<Template> GetTemplate(string id);
        Task<List<Template>> SearchTemplates(string companyId, string searchTerm);
        Task<Template> UpdateTemplate(Template template);
        Task DeleteTemplate(Template template);
        Task<Item> AddItem(Item item);
        Task<Item> GetItem(string id);
        Task<List<Item>> SearchItems(string companyId, string templateId, string searchTerm);
        Task<Item> UpdateItem(Item item);
        Task DeleteItem(Item item);
        Task<Property> AddProperty(Property property);
        Task<Property> GetProperty(int id);
        Task<List<Property>> GetProperties(string templateId);
        Task<Property> UpdateProperty(Property property);
        Task DeleteProperty(Property property);
    }

    public class InventoryProvider : IInventoryProvider
    {
        private readonly InspectifyDbContext dbContext;

        public InventoryProvider(InspectifyDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        public async Task<Template> AddTemplate(Template template)
        {
            await dbContext.Templates.AddAsync(template);
            await dbContext.SaveChangesAsync();
            return template;
        }

        public async Task<Template> GetTemplate(string id)
        {
            return await dbContext.Templates
                .Include(t => t.Properties)
                .SingleOrDefaultAsync(t => t.Id == id);
        }

        public async Task<List<Template>> SearchTemplates(string companyId, string searchTerm)
        {
            var templates = dbContext.Templates
                .Where(t => t.CompanyId == companyId);
            if (!String.IsNullOrEmpty(searchTerm))
            {
                templates = templates.Where(t => t.Name.Contains(searchTerm));
            }
            return await templates.ToListAsync();
        }

        public async Task<Template> UpdateTemplate(Template template)
        {
            dbContext.Update(template);
            await dbContext.SaveChangesAsync();
            return template;
        }

        public async Task DeleteTemplate(Template template)
        {
            dbContext.Templates.Remove(template);
            await dbContext.SaveChangesAsync();
        }

        public async Task<Item> AddItem(Item item)
        {
            await dbContext.Items.AddAsync(item);
            await dbContext.SaveChangesAsync();
            return item;
        }

        public async Task<Item> GetItem(string id)
        {
            return await dbContext.Items
                .Include(i => i.Template)
                .Include(i => i.Values)
                .SingleOrDefaultAsync(t => t.Id == id);
        }

        public async Task<List<Item>> SearchItems(string companyId, string templateId, string searchTerm)
        {
            var items = dbContext.Items.AsQueryable();
            if (!String.IsNullOrEmpty(templateId))
            {
                items = items.Where(i => i.TemplateId == templateId);
            }
            else
            {
                items = dbContext.Templates
                    .Where(t => t.CompanyId == companyId)
                    .Select(t => t.Items)
                    .SelectMany(t => t);
            }
            if (!String.IsNullOrEmpty(searchTerm))
            {
                items = items.Where(i => i.Name.Contains(searchTerm));
            }
            return await items.ToListAsync();
        }

        public async Task<Item> UpdateItem(Item item)
        {
            dbContext.Update(item);
            await dbContext.SaveChangesAsync();
            return item;
        }

        public async Task DeleteItem(Item item)
        {
            dbContext.Items.Remove(item);
            await dbContext.SaveChangesAsync();
        }

        public async Task<Property> AddProperty(Property property)
        {
            await dbContext.Properties.AddAsync(property);
            await dbContext.SaveChangesAsync();
            return property;
        }

        public async Task<Property> GetProperty(int id)
        {
            return await dbContext.Properties
                .SingleOrDefaultAsync(p => p.Id == id);
        }

        public async Task<List<Property>> GetProperties(string templateId)
        {
            var properties = dbContext.Properties.Where(i => i.TemplateId == templateId);
            return await properties.ToListAsync();
        }

        public async Task<Property> UpdateProperty(Property property)
        {
            dbContext.Update(property);
            await dbContext.SaveChangesAsync();
            return property;
        }

        public async Task DeleteProperty(Property property)
        {
            dbContext.Properties.Remove(property);
            await dbContext.SaveChangesAsync();
        }
    }
}